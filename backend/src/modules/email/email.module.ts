import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: configService.get('EMAIL_APP'),
                        pass: configService.get('EMAIL_APP_PASSWORD')
                    }
                },
                defaults: {
                    from: '"TECH STORE👻" <haidang02032003@gmail.com>'
                }
            }),
            inject: [ConfigService]
        })
    ],
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule {}
