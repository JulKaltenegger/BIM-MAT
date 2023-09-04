import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RdfController } from './rdf.controller'
import { RdfService } from './rdf.service'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  controllers: [RdfController],
  providers: [RdfService],
  exports: [RdfService],
})
export class RdfModule { }
