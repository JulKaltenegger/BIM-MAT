import {
  Controller,
  Get, Post, Body,
  Param, Query
} from '@nestjs/common'
import {
  ApiBearerAuth, ApiBody, ApiConsumes,
  ApiOperation, ApiParam, ApiQuery, ApiTags
} from '@nestjs/swagger'
import { RdfService } from './rdf.service'

const example_query = `PREFIX bmp: <https://w3id.org/bmp#> 
PREFIX bot: <https://w3id.org/bot#> 
PREFIX beo: <https://pi.pauwel.be/voc/buildingelement#> 
prefix inst: <https://instance.com#> 
prefix xsd:  <http://www.w3.org/2001/XMLSchema#> 
prefix EXAMPLE: <https://example.com#> 
prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> 
prefix mep:  <https://pi.pauwel.be/voc/distributionelement#> 
prefix props:  <https://w3id.org/props#> 

SELECT  *
WHERE {
   ?Wall rdfs:label ?WallType .
   ?Wall props:nLSfB ?NLSFB .
   ?Wall props:area ?Area .
   ?Wall props:thickness ?Thickness .
} LIMIT 10`

@ApiBearerAuth()
@ApiTags('RDF')
@Controller('rdf')
export class RdfController {
  constructor(private readonly rdfService: RdfService) { }

  @Post(':id')
  @ApiParam({ name: 'id', example: 'atlas', type: String })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        query: {
          type: 'object',
          example: example_query,
        }
      }
    }
  })
  rdf(
    @Param('id') id: string,
    @Body('query') query: string
  ) {
    return this.rdfService.rdf(id, query)
  }

  @Get(':id/namespaces')
  @ApiParam({ name: 'id', example: 'atlas', type: String })
  namespaces(
    @Param('id') id: string,
  ) {
    return this.rdfService.namespaces(id)
  }

  @Get(':id/sensors')
  @ApiOperation({ summary: 'Get Sensors by GUID of space' })
  @ApiParam({ name: 'id', description: 'Project id', example: 'atlas', type: String })
  @ApiQuery({ name: 'item', example: '0LnrpxIav0Ju4gTy7JmWWJ', type: String })
  getSensors(
    @Param('id') id: string,
    @Query('item') item: string
  ) {
    return this.rdfService.getSensors(id, item)
  }
}
