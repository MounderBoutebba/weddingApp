import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// tslint:disable-next-line: no-var-requires
/*
require('@google-cloud/profiler').start();
*/

const PORT = process.env.PORT || 3000;

(async function bootstrap() {
	const options = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('WINWEZ API')
		.setDescription('The winwez API description')
		.setVersion('1.0')
		.addTag('winwez')
		.setBasePath('api')
		.build();
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin:'*',
		optionsSuccessStatus: 204,
		allowedHeaders: '*',
		preflightContinue: false,
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
	});
	app.useGlobalPipes(
/*		new ValidationPipe({
			transform: true,
			whitelist: true,
		})*/
	);
	app.setGlobalPrefix('api');
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
	await app.listen(PORT, '0.0.0.0');
})();
