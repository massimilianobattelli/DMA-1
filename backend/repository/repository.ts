import { PrismaClient, list } from '@prisma/client'

export class Repository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getUsers(): Promise<list[]> {
    return this.prisma.list.findMany()
  }

  async insertUser(user: any): Promise<list> {
    return this.prisma.list.create({
      data: user,
    })
  }
}


