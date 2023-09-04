import { Module } from '@nestjs/common'
import { SensorsService } from './sensors.service'
import { SensorsController } from './sensors.controller'
import { MongooseModule } from '@nestjs/mongoose'
import {
  SensorData,
  SensorDataSchema,
} from './entities/sensor.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: SensorData.name, schema: SensorDataSchema
    }])
  ],
  controllers: [SensorsController],
  providers: [SensorsService]
})
export class SensorsModule { }
