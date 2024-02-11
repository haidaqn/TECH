import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { PagingOrder } from '../dto/order.dto';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    @Get('admin/getAll')
    async getAllOrderByAdmin(@Query() { page, limit, status }: PagingOrder) {
        return await this.orderService.getAllOrderByAdmin(page, limit, status);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('user/getAll')
    async getAllOrderByUser(@Query() { page, limit, status }: PagingOrder, @Req() request: any) {
        const userId = (request.user._id as ObjectId).toString();
        return await this.orderService.getAllOrderByUserId(page, limit, status, userId);
    }

    @Post('updateStatus/:oid')
    async updateOrder(@Param('oid') oid: string, @Body() body: { newStatus: string }) {
        const { newStatus } = body;
        return await this.orderService.updateOrder(oid, newStatus);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createOrder')
    async createOrder(@Req() request: any, @Body() body: { coupon: number }) {
        const userId = (request.user._id as ObjectId).toString();
        const { coupon } = body;
        return await this.orderService.createOrder(userId, coupon);
    }

    @Delete('delete')
    async deleteMutipleOrder(@Body() body) {
        return await this.orderService.deleteMutipleOrder(body as string[]);
    }
}
