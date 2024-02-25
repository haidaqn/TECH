import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { ChangePasswordUser, CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private userService: UserService) {}

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request
    ) {
        return await this.authService.register(createUserDto, res, req);
    }

    @Get('finalRegister/:token')
    async finalRegister(@Param('token') token: string, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return await this.authService.finalRegister(token, req, res);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);
    }

    @Post('refresh')
    async refresh(@Body() body) {
        return await this.authService.refresh(body.refresh_token);
    }

    @Get('findEmailUser')
    async findEmailUser(@Query('email') email: string) {
        return await this.authService.checkEmailUser(email);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logout(@Req() req: any) {
        const userID = (req.user._id as ObjectId).toString();
        await this.authService.logout(userID);
        return true
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('changepassword')
    async changePassword(@Body() body: ChangePasswordUser, @Req() request: any) {
        const userID = (request.user._id as ObjectId).toString();
        if (body.enterNewPassword !== body.newPassword) throw new Error('password incorrect');
        return await this.userService.changePassword(body, userID);
    }

    @Post('sendmail-toast')
    async sendMailToast(@Body() { data }: { data: string }) {
        return await this.authService.sendMailToast(data);
    }
}
