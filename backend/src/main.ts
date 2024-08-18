import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    dotenv.config();
    app.use(cookieParser());

    const options: CorsOptions = {
        origin: ['https://tech-eta-three.vercel.app/', 'https://haidaqn.vercel.app/'],
        credentials: true,
    };

    app.enableCors(options);
    
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
