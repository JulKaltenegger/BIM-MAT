import 'reflect-metadata'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.use(helmet())
  app.enableCors()
  app.use(compression())

  const config = new DocumentBuilder()
    .setTitle('BIM-SIM-API')
    .setDescription('API for BIM-SIM')
    .setVersion('1.0')
    .addBearerAuth()
    .addOAuth2()
    .addServer('/')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe())

  const PORT = Number(process.env.PORT) || 8080
  await app.listen(PORT)
}

bootstrap()
