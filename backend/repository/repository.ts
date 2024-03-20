import { PrismaClient, list } from '@prisma/client'

export class Repository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getUsers(limit: number): Promise<list[]> {
    return this.prisma.list.findMany({
      take: limit,
    });
  }
  async insertUser(user: any): Promise<list> {
    return this.prisma.list.create({
      data: user,
    })
  }
}


