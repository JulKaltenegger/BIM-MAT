import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SensorsModule } from './sensors/sensors.module'
import { RdfModule } from './rdf/rdf.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SensorsModule,
    RdfModule,
    MongooseModule.forRoot(
      `${process.env.MONGO_SERVER}`, {
      dbName: `${process.env.MONGO_DB}`
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
