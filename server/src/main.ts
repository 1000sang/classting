import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";
import { HttpConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService= app.get<ConfigService>(ConfigService);

  const httpConfig = configService.get<HttpConfig>('http');

  const config = new DocumentBuilder()
      .setTitle('Classting')
      .setDescription('클래스팅 과제 제출용 API description')
      .setVersion('1.0')
      .addTag('Classting')
      .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);


  await app.listen(3000);
}
bootstrap();
