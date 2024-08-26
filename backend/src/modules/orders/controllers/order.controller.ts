import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { DeleteMultipleProductDto, orderID, PagingOrder, updateStatusDto } from '../dto/order.dto';
import { OrderService } from '../services/order.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    @Get('admin/getAll')
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'status', required: false, type: String })
    async getAllOrderByAdmin(@Query() { page, limit, status }: PagingOrder) {
        return await this.orderService.getAllOrderByAdmin(page, limit, status);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user/getAll')
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'status', required: false, type: String })
    async getAllOrderByUser(@Query() { page, limit, status }: PagingOrder, @Req() request: any) {
        const userId = (request.user._id as ObjectId).toString();
        return await this.orderService.getAllOrderByUserId(page, limit, status, userId);
    }

    @Post('updateStatus/:oid')
    async updateOrder(@Param('oid') oid: string, @Body() body: updateStatusDto) {
        const { newStatus } = body;
        return await this.orderService.updateOrder(oid, newStatus);
    }

    @Get('detail/:oid')
    async getDetailOrderByID(@Param('oid') oid: string) {
        return await this.orderService.getDetail(oid)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createOrder')
    async createOrder(@Req() request: any, @Body() body: { coupon?: number }) {
        const userId = (request.user._id as ObjectId).toString();
        return await this.orderService.createOrder(userId, 0);
    }

    @Delete('delete')
    async deleteMutipleOrder(@Body() body: DeleteMultipleProductDto) {
        return await this.orderService.deleteMutipleOrder(body.ids);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('change-order')
    async changeOrderByUser(@Req() request: any, @Body() body: orderID) {
        const { orderID } = body;
        const userId = (request.user._id as ObjectId).toString();
        return await this.orderService.CancellOrderByUser(userId, orderID);
    }
}
