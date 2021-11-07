import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptors/transform.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 使用拦截器
  app.useGlobalInterceptors(new TransformInterceptor())

  // 配置swagger
  const config = new DocumentBuilder()
    .setTitle('coding-blog-server')
    .setDescription('博客后端')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(8000);
}
bootstrap();
