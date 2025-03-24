import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async createAccount(userId: string) {
    // Verifica se o usuário já tem uma conta
    const existingAccount = await this.prisma.account.findFirst({
      where: { userId },
    });

    if (existingAccount) {
      throw new Error('Usuário já possui uma conta.');
    }

    // Cria a conta com saldo inicial de 0
    return this.prisma.account.create({
      data: {
        userId,
        balance: 0,
        currency: 'BRL',
      },
    });
  }

  async getAccount(userId: string) {
    return this.prisma.account.findFirst({
      where: { userId },
    });
  }
}
