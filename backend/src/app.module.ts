import { Module } from '@nestjs/common';
import { MainModule } from './modules/main.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MainModule, ConfigModule.forRoot(), MongooseModule.forRoot("mongodb+srv://haidang02032003:Haidang2003x@cluster0.ivbffxw.mongodb.net/tech_store")],
    controllers: [],
    providers: []
})
export class AppModule {}
