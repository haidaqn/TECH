import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    const options: CorsOptions = {
        origin: true, 
        credentials: true
    };
    app.enableCors(options);
    
    await app.listen(3000);
}
bootstrap();
