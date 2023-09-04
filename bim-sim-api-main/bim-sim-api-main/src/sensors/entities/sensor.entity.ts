import { ApiProperty } from "@nestjs/swagger"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SensorDataDocument = SensorData & Document

@Schema({
    collection: 'bms-data',
    toJSON: {
        transform: (doc: SensorDataDocument, ret: SensorDataDocument, options: any) => {
            delete ret._id
            delete ret.sensor_id
        }
    }
})
export class SensorData {

    @Prop({ required: true })
    @ApiProperty()
    sensor_id: string

    @Prop({ required: true })
    @ApiProperty()
    value: number

    @Prop({ required: true })
    @ApiProperty()
    timestamp: Date
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData)
