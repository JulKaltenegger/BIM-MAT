# BIM-SIM-API

## Running the program
1. Clone the repository
2. Run the following command inside the repository
```
npm install
```
3. You need to have installed MongoDB and GraphDB to run this program.
4. Copy the .env.template file to a new file named .env and change the variables accordingly.
5. Run the following command inside the repository to run the code in development mode
```
npm run start:dev
```
6. Open the link localhost:8090/api

## Creating MongoDB sensor data database
1. Install MongoDB
2. Create a new database named 'bim-sim'
3. Create a collection named 'bms-data'
4. Upload the sensor data that complies to the following schema
   ```
        {
            "timestamp":"2018-01-01T00:00:00.000Z",
            "sensor_id":"TRL-001",
            "value":1.200000048
        }
   ```

## Creating GraphDB database
1. Install graphDB
2. Create a repository named 'atlas'
3. Upload the .ttl file to the 'atlas' repository
4. Sample of the graph looks like below.

```java

# baseURI: http://linkedbuildingdata.net/ifc/resources20230412_115455/

@prefix inst: <http://linkedbuildingdata.net/ifc/resources20230412_115455/> .
@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .
@prefix bot:  <https://w3id.org/bot#> .
@prefix beo:  <https://pi.pauwel.be/voc/buildingelement#> .
@prefix mep:  <https://pi.pauwel.be/voc/distributionelement#> .
@prefix props:  <https://w3id.org/props#> .
@prefix brick: <https://brickschema.org/schema/Brick#>.
@prefix ref: <https://brickschema.org/ontology/1.3/classes/IFCReference/>.

inst: rdf:type <http://www.w3.org/2002/07/owl#Ontology> .

inst:space_155
	a bot:Space ;
	bot:hasGuid "355ade6b-7d1a-4f1e-a7b0-c03b8f571c2e"^^xsd:string ;
	props:name "MCC01 room"^^xsd:string ;
	props:name "MCC01 room"^^xsd:string ;
	props:category "Spaces"^^xsd:string ;
	props:reference "MCC01 room 1"^^xsd:string ;
	props:category "Spaces"^^xsd:string . 
  

inst:electricDistributionBoard_9205
    a brick:Motor_Control_Center ,
    brick:Sensor;
    brick:hasUnit "kWh" ;
    brick:hasLocation inst:space_155;
    brick:timeseries [
        brick:hasTimeseriesId "MCC01" ;
        brick:storedAt "mongodb://localhost:27017/bim-sim" ;
    ] ; .


```

## Testing

1. Old Atlas (without brick:timeseries)

Run the following query to get all the sensors installed in the Room with GUID "0KLkXPBfvES9D1y7EjijkE".
```sql
PREFIX brick: <https://brickschema.org/schema/Brick#> 
PREFIX inst: <http://linkedbuildingdata.net/ifc/resources20201208_005325/> 
PREFIX props: <https://w3id.org/props#> 
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT ?location ?item ?sensor WHERE { 
          ?location bot:hasGuid | props:hasCompressedGuid "0KLkXPBfvES9D1y7EjijkE" .
          ?item brick:hasLocation ?location .
          ?item brick:hasPoint ?sensor .
       }
```

2. New (with brick:timeseries)

```sql

PREFIX brick: <https://brickschema.org/schema/Brick#> 
PREFIX inst: <http://linkedbuildingdata.net/ifc/resources20201208_005325/> 
PREFIX props: <https://w3id.org/props#> 
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX bot: <https://w3id.org/bot#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?location ?item ?sensor WHERE { 
         ?location bot:hasGuid | props:hasCompressedGuid "355ade6b-7d1a-4f1e-a7b0-c03b8f571c2e"^^xsd:string .
         ?item brick:hasLocation ?location .
   		?item a brick:Sensor .
  		   ?item brick:timeseries ?arr .
    	   ?arr brick:hasTimeseriesId ?sensor .
}
```

## Errors and debugging
1. If the MongoDB/ GraphDB database connection is not working, replace the 'localhost' in .env file with '127.0.0.1'.
2. Check if the env variables are correct.

