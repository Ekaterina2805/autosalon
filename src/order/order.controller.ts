import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('income/:startDate/:endDate')
  async getIncome(@Param('startDate') startDate: string,
  @Param('endDate') endDate: string )
  {
    return await this.orderService.getIncome(new Date(startDate), new Date(endDate))
  }

  @Get('all')
  async findAll(){
    return await this.orderService.findAll()
  }
}
