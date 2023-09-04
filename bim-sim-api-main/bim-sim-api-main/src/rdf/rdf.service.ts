import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class RdfService {

  RDF_SERVER = process.env.RDF_SERVER || 'http://TUE027204:7200/repositories/230421_BMP'

  readonly logger = new Logger(RdfService.name)

  constructor() {
    this.logger.debug(this.RDF_SERVER)
  }

  async namespaces(id: string) {

    const response = await fetch(
      `${this.RDF_SERVER}/${id}/namespaces`, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    })

    const data = await response.text()
    return data
  }

  async rdf(id: string, query: string) {

    const response = await fetch(
      `${this.RDF_SERVER}/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/sparql-query',
      },
      body: query
    })

    const data = await response.text()
    return data
  }

  async getSensors(id: string, item: string) {

    // const query =
    //   `PREFIX brick: <https://brickschema.org/schema/Brick#> 
    //   PREFIX inst: <http://linkedbuildingdata.net/ifc/resources20201208_005325/> 
    //   PREFIX props: <https://w3id.org/props#> 
    //   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    //   select ?location ?item ?sensor where { 
    //       ?location bot:hasGuid | props:hasCompressedGuid '${item}' .
    //       ?item brick:hasLocation ?location .
    //       ?item brick:hasPoint ?sensor .
    //    } `

    const query = 
    `
    PREFIX brick: <https://brickschema.org/schema/Brick#> 
    PREFIX inst: <http://linkedbuildingdata.net/ifc/resources20201208_005325/> 
    PREFIX props: <https://w3id.org/props#> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bot: <https://w3id.org/bot#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    select ?location ?item ?sensor where { 
        ?location bot:hasGuid | props:hasCompressedGuid '${item}' .
        ?item brick:hasLocation ?location .
   		  ?item a brick:Sensor .
  		  ?item brick:timeseries ?arr .
    	  ?arr brick:hasTimeseriesId ?sensor .
    }
    `

    const response = await fetch(
      `${this.RDF_SERVER}/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/sparql-query',
      },
      body: query
    })

    const data = await response.json()
    return data.results.bindings
  }
}
