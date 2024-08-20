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
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 5 * 60 * 1000
            });

            const verifyLink = `https://api-tech-store.onrender.com/auth/finalRegister/${token}`;
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

    sendMailToast = async (email: string) => {
        try {
            const html = `Bạn đã đăng ký nhận thông báo từ TECH-STORE qua email này. Khi có thông báo mới chúng tôi sẽ gửi email cho bạn`;
            const subject = 'Đăng ký nhận thông báo';
            const data = {
                to: email,
                html,
                subject
            };
            await this.sendVerifyEnmail(data);
            return true;
        } catch (error) {}
    };

    finalRegister = async (tokenURL: string, req: Request, res: Response) => {
        try {
            const cookie = req.cookies['dataRegister'];
            const dataRegister = JSON.parse(cookie) as unknown as CookieReq;
            const { data, token } = dataRegister;
            if (!cookie || token !== tokenURL) {
                res.clearCookie('dataRegister');
                return res.redirect('https://localhost:5173/finalregister/failed');
            } else {
                try {
                    await this.userService.createUser(data);
                    res.clearCookie('dataRegister');
                    return res.redirect('https://localhost:5173/finalregister/success');
                } catch (error) {
                    res.clearCookie('dataRegister');
                    return res.redirect('https://localhost:5173/finalregister/failed');
                }
            }
        } catch (error) {
            return res.redirect('https://localhost:5173/finalregister/failed');
        }
    };

    login = async (loginUserDto: LoginUserDto) => {
        const user = await this.userService.findByLogin(loginUserDto);
        const token = await this.jwtService.signAsync({ email: user.email, role: user.role, id: user._id });
        const refreshToken = await this.jwtService.sign(
            { email: user.email, role: user.role, id: user._id },
            {
                secret: process.env.SECRETKEY_REFRESH,
                expiresIn: process.env.EXPIRESIN_REFRESH
            }
        );
        await this.userService.update({ email: user.email }, { refreshToken: refreshToken });
        return BaseResponse<AuthResponse>({ data: user, token, refreshToken }, 'ok', HttpStatus.OK, true);
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

    private async _createToken({ email, _id, role }, refresh = true) {
        const accessToken = this.jwtService.sign({ email, id: _id, role });
        if (refresh) {
            const refreshToken = this.jwtService.sign(
                { email, id: _id, role },
                {
                    secret: process.env.SECRETKEY_REFRESH,
                    expiresIn: process.env.EXPIRESIN_REFRESH
                }
            );
            await this.userService.update({ email: email }, { refreshToken: refreshToken });
            return {
                token: accessToken,
                refreshToken
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
            console.log(payload)
            const user = await this.userService.getUserByRefresh(refresh_token, payload.email);
            const token = await this._createToken(user);
            return token;
        } catch (e) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }

    async verifyAccessToken(token: string) {
        return token;
    }

    async logout(id: string) {
        await this.userService.update({ _id: id }, { refreshToken: null });
    }
}
