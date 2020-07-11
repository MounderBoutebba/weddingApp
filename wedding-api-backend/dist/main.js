"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const PORT = process.env.PORT || 3000;
(async function bootstrap() {
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('WINWEZ API')
        .setDescription('The winwez API description')
        .setVersion('1.0')
        .addTag('winwez')
        .setBasePath('api')
        .build();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        optionsSuccessStatus: 204,
        allowedHeaders: '*',
        preflightContinue: false,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
    });
    app.useGlobalPipes();
    app.setGlobalPrefix('api');
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(PORT, '0.0.0.0');
})();
//# sourceMappingURL=main.js.map