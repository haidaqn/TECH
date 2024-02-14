import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { DataOrder, UpdateInfoUser } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('getAll')
    async getAll(@Query() { page, limit }: { page: number; limit: number }) {
        return await this.userService.getAllUser(page, limit);
    }

    @Post('block/:id')
    async blockUserEndpoint(@Param('id') userId: string, @Body() body: { block: boolean }) {
        const { block } = body;
        return await this.userService.blockUserID(userId, block);
    }

    @Delete('delete')
    async deleteMultipleUser(@Body() body: string[]) {
        console.log(body);
        return await this.userService.deleteMultipleUsers(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('updateCart')
    async updateCart(@Req() request: any, @Body() body: DataOrder) {
        const userID = (request.user._id as ObjectId).toString();
        return await this.userService.updateCartUser(userID, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getCart/User')
    async getCartUser(@Req() request: any) {
        const userID = (request.user._id as ObjectId).toString();
    }

    @Post('forgotpassword')
    async forogt(@Body() body: { email: string }) {
        const { email } = body;
        return await this.userService.forgotPassword(email);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('updateInfo')
    async updateInfo(@Req() request: any, @Body() body: UpdateInfoUser) {
        const userID = (request.user._id as ObjectId).toString();
        return await this.userService.updateInfoUser(userID, body);
    }
}
