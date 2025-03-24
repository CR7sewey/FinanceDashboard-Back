import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('accounts')
@UseGuards(AuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('create')
  async createAccount(@Req() req) {
    console.log('USER ID:', req); // <-- Verifica se o ID chega!

    return this.accountsService.createAccount(req.user.sub);
  }

  @Get()
  async getAccount(@Req() req) {
    return this.accountsService.getAccount(req.user.userId);
  }
}
