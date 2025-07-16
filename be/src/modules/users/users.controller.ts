import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string }) {
    return this.usersService.registerUser(body.email, body.password, body.name);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.usersService.loginUser(body.email, body.password);
  }

  @Get(':id/interests')
  async getInterests(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    return { interests: user?.interests || [] };
  }

  @Patch(':id/interests')
  async updateInterests(@Param('id') id: string, @Body() body: { interests: string[] }) {
    return this.usersService.updateUserInterests(id, body.interests);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
} 