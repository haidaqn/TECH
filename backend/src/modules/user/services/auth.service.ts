import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { EmailService } from 'src/modules/email/email.service';
import { BaseResponse } from 'src/shared/base/base.response';
import * as makentoken from 'uniqid';
import { AuthResponse, CookieReq, CreateUserDto, EmailSendDto, LoginUserDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ) {}

    register = async (userDto: CreateUserDto, res: Response, req: Request) => {
        try {
            const user = await this.checkEmailUser(userDto.email);
            if (user.success === true) throw new Error('Tài khoản đã tồn tại');
            const token = await this.makeToken();

            const cookieHeader = JSON.stringify({ data: userDto, token });

            res.cookie('dataRegister', cookieHeader, {
                sameSite: 'lax',
                httpOnly: true,
                maxAge: 5 * 60 * 1000
            });

            const verifyLink = `http://localhost:3000/auth/finalRegister/${token}`;
            const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng ký tài khoản của bạn. Link này sẽ hết hạn sau 5 phút kể từ bây giờ. <a href="${verifyLink}">Click here</a>`;

            const subject = 'Xác minh tài khoản';
            const data = {
                to: userDto.email,
                html,
                subject
            };
            await this.sendVerifyEnmail(data);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    finalRegister = async (tokenURL: string, req: Request, res: Response) => {
        const cookie = req.cookies.dataRegister;
        const dataRegister = JSON.parse(cookie) as unknown as CookieReq;
        const { data, token } = dataRegister;
        if (!cookie || token !== tokenURL) {
            res.clearCookie('dataRegister');
            return res.redirect('http://localhost:5173/finalregister/failed');
        } else {
            try {
                const user = await this.userService.createUser(data);
                const tokenNew = await this.jwtService.signAsync({ email: data.email });
                res.clearCookie('dataRegister');
                return res.redirect('https://tech-three-beta.vercel.app/finalregister/success');
            } catch (error) {
                res.clearCookie('dataRegister');
                return res.redirect('https://tech-three-beta.vercel.app/finalregister/failed');
            }
        }
    };

    login = async (loginUserDto: LoginUserDto) => {
        const user = await this.userService.findByLogin(loginUserDto);
        const token = await this.jwtService.signAsync({ email: user.email, role: user.role, id: user._id });
        return BaseResponse<AuthResponse>({ data: user, token }, 'ok', HttpStatus.OK, true);
    };

    checkEmailUser = async (email: string) => {
        const user = await this.userService.findByEmail(email);
        if (user && user.registered) {
            return BaseResponse<string>(user.email, 'ok', HttpStatus.OK, true);
        } else {
            return BaseResponse<any>(undefined, 'This email does not exist', HttpStatus.BAD_REQUEST, false);
        }
    };

    validateUser = async (email: string) => {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    };

    private async makeToken() {
        return makentoken();
    }

    private async _createToken({ email }, refresh = true) {
        const accessToken = this.jwtService.sign({ email });
        if (refresh) {
            const refreshToken = this.jwtService.sign(
                { email },
                {
                    secret: process.env.SECRETKEY_REFRESH,
                    expiresIn: process.env.EXPIRESIN_REFRESH
                }
            );
            await this.userService.update({ email: email }, { refreshToken: refreshToken });
            return {
                expiresIn: process.env.EXPIRESIN,
                accessToken,
                refreshToken,
                expiresInRefresh: process.env.EXPIRESIN_REFRESH
            };
        } else {
            return {
                expiresIn: process.env.EXPIRESIN,
                accessToken
            };
        }
    }

    private async sendVerifyEnmail(data: EmailSendDto) {
        return await this.emailService.sendMail(data);
    }

    async refresh(refresh_token: string) {
        try {
            const payload = await this.jwtService.verify(refresh_token, {
                secret: process.env.SECRETKEY_REFRESH
            });

            const user = await this.userService.getUserByRefresh(refresh_token, payload.email);

            const token = await this._createToken(user, false);

            return {
                email: user.email,
                ...token
            };
        } catch (e) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }

    async verifyAccessToken(token: string) {
        return token;
    }

    async logout(user: User) {
        await this.userService.update({ email: user.email }, { refreshToken: null });
    }
}
