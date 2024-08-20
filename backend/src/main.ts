import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    dotenv.config();
    app.use(cookieParser());

    const options: CorsOptions = {
        origin: ['https://tech-eta-three.vercel.app/', 'https://haidaqn.vercel.app/'],
        credentials: true,
    };

    const swaggerConfig = new DocumentBuilder()
        .setTitle("TECH SHOP API")
        .setDescription("TECH SHOP core apis for development")
        .addTag("TECH SHOP")
        .addServer("http://localhost:3000", "Development API[PORT=8080]")
        .addBearerAuth(
            {
                description: `[just text field] Please enter token in following format: Bearer <JWT>`,
                name: "Authorization",
                bearerFormat: "Bearer",
                scheme: "Bearer",
                type: "http",
                in: "Header"
            }
        )
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig, {
        deepScanRoutes: true
    });
    SwaggerModule.setup("docs", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            uiConfig: {
                docExpansion: 'none'
            },
        },
    });


    app.enableCors(options);
    
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
