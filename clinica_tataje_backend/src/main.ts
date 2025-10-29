import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './common/interceptors/response-format.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'null'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
  });

  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Clínica')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);

  const port = Number(process.env.PORT) || 3030;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 API corriendo en http://0.0.0.0:${port}`);
}
bootstrap();
