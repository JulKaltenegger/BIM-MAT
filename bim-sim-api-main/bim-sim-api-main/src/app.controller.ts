import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AppService } from './app.service'

@Controller()
export class AppController {

  constructor(private appService: AppService) { }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello()
  // }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.user
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user
  // }
}
