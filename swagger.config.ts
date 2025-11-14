import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Invoice API')
    .setDescription('REST API documentation for e-commerce service')
    .setVersion(process.env.API_VERSION ?? '1.0')
    /* .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'JWT-auth', // nome da estratégia
    ) */
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  const swaggerOptions =
    process.env.NODE_ENV === 'production'
      ? { swaggerOptions: { supportedSubmitMethods: [] } }
      : undefined;

  SwaggerModule.setup('api/docs', app, document, swaggerOptions);
}
