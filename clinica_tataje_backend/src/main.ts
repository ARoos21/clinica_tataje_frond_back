import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './common/interceptors/response-format.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
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

  const port = Number(process.env.PORT) || 3030;
// antes: await app.listen(port, '0.0.0.0');
await app.listen(port, '0.0.0.0');

console.log(`🚀 API corriendo en http://127.0.0.1:${port}`);
}
bootstrap();
