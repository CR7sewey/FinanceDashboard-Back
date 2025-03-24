import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post('create')
  async createTransaction(@Req() req, @Body() body) {
    return this.transactionsService.createTransaction(
      req.user.sub,
      body.amount,
      body.type,
      body.category,
    );
  }

  @Get()
  async getTransactions(@Req() req) {
    return this.transactionsService.getTransactions(req.user.sub);
  }
}
