import {
  Controller, Get,
  Param, Query
} from '@nestjs/common'
import { SensorsService } from './sensors.service'
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@Controller('sensors') // path prefix (sensors/)
@ApiTags('Sensors') // display topic
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) { }

  @Get(':id/records')
  @ApiParam({ name: 'id', example: '11NR00STE-001TRL', type: String })
  @ApiQuery({ name: 'start', required: false, example: new Date(Date.now() - 86400000).toISOString(), type: Date })
  @ApiQuery({ name: 'end', required: false, example: new Date().toISOString(), type: Date })
  @ApiQuery({ name: 'sample', required: false, example: 100, type: Number })
  async getRecords(
    @Param('id') id: string, // path parameter
    @Query('start') start: string, // query parameter
    @Query('end') end: string,
    @Query('sample') sample: string
  ) {
    return {
      sensor_id: id,
      start: start,
      end: end,
      result: await this.sensorsService
        .getRecords(id, new Date(start), new Date(end), +sample)
    }
  }
}
