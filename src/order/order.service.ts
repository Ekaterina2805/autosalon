import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getIncome(startDate: Date, endDate: Date) {
    const orders = await this.prisma.order.findMany({
      where: {
        date: {
          lte: endDate,
          gte: startDate,
        },
      },
    });
    return {
      income: orders.reduce((acc: number, order) => acc + order.price, 0)
    }
  } 

  async findAll(){
    const orders = await this.prisma.order.findMany({
      orderBy:[
        {
          date: 'asc'
        },
        {
          surname: "asc"
        }, 
        {
          name: "asc"
        },
        {
          price: "asc"
        }
      ],
      include: {
        auto: true
      }
    })
    return orders.map(order => {
      return {
        user: `${order.surname} ${order.name}`,
        tel: order.tel,
        price: order.price,
        date: order.date,
        auto: order.auto.name,
        number: order.number
      }
    })
  }


}
