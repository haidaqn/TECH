import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './services/auth.service';
import { Request } from 'express';
@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRETKEY
        });
    }

    async validate(payload: any) {
        const user = await this.authService.validateUser(payload.email);
        if (!user) {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private static extractJWT(req: Request): string | null {
        return req.cookies && req.cookies.dataregister ? req.cookies.dataregister : null;
    }
}
