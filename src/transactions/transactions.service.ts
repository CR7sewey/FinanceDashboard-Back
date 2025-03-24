import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(
    userId: string,
    amount: number,
    type: string,
    category: string,
  ) {
    // Busca a conta do usuário
    const account = await this.prisma.account.findFirst({ where: { userId } });

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    // Atualiza saldo baseado no tipo de transação
    const newBalance =
      type === 'income' ? account.balance + amount : account.balance - amount;

    // Cria a transação
    const transaction = await this.prisma.transaction.create({
      data: {
        accountId: account.id,
        amount,
        type,
        category,
      },
    });

    // Atualiza o saldo da conta
    await this.prisma.account.update({
      where: { id: account.id },
      data: { balance: newBalance },
    });

    return transaction;
  }

  async getTransactions(userId: string) {
    const account = await this.prisma.account.findFirst({ where: { userId } });

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    return this.prisma.transaction.findMany({
      where: { accountId: account.id },
      orderBy: { date: 'desc' },
    });
  }
}
