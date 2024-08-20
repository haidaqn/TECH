import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { User } from '../models/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ type: String, default: 'example@gmail.com' })
    @IsEmail({}, { message: 'INVALID_EMAIL' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: String, default: "********" })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ type: String, default: "Vu Truong Giang" })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: String, default: "0333521234" })
    @IsNotEmpty()
    @IsString()
    mobile: number;
}

export interface RegisterDto {
    password: string;
    name: string;
    mobile: number;
    email: string;
    token: string;
}

export interface CookieReq {
    token: string;
    data: RegisterDto;
}

export class LoginUserDto {
    @ApiProperty({ type: String, default: "examile@gmail.com" })
    @IsEmail({}, { message: "INVALID_EMAIL" })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: String, default: "password example" })
    @IsNotEmpty()
    password: string;
}

export class EmailDto {
    @ApiProperty({ type: String, default: "example default" })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class refreshTokenDto {
    @ApiProperty({ type: String, default: "example refresh token" })
    @IsNotEmpty()
    refresh_token: string
}

export class EmailSendDto {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export interface AuthResponse {
    data: User;
    token: string;
    refreshToken: string;
}

export interface AuthResponseRegister {
    email: string;
    token: string;
}
export class DataOrder {
    @ApiProperty({ type: String, default: 'id product' })
    @IsString()
    id: string;

    @ApiProperty({ type: String, default: 'Product Title' })
    @IsString()
    title: string;

    @ApiProperty({ type: Number, default: 1 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ type: Number, default: 100 })
    @IsNumber()
    price: number;

    @ApiProperty({ type: String, default: 'image_url' })
    @IsString()
    img: string;

    @ApiProperty({ type: String, default: 'Red' })
    @IsString()
    color: string;

    @ApiProperty({ type: Boolean, default: false, required: false })
    @IsOptional()
    @IsBoolean()
    reset?: boolean;

    @ApiProperty({ type: Boolean, default: true })
    @IsBoolean()
    add: boolean;
}

export class UpdateInfoUser {
    @ApiProperty({ type: String, description: 'User name', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ type: String, description: 'Mobile phone number', required: false })
    @IsOptional()
    @IsString()
    mobile?: string;

    @ApiProperty({ type: String, description: 'Avatar URL', required: false })
    @IsOptional()
    @IsString()
    @IsUrl({}, { message: "INVAILD_URL" })
    avatar?: string;

    @ApiProperty({ type: String, description: 'Address', required: false })
    @IsOptional()
    @IsString()
    address?: string;
}

export class ChangePasswordUser {
    @ApiProperty({ type: String, default: 'example pw' })
    @IsString()
    oldPassword: string;

    @ApiProperty({ type: String, default: 'newexample pw' })
    @IsString()
    newPassword: string;

    @ApiProperty({ type: String, default: 'newexample pw' })
    @IsString()
    enterNewPassword: string;
}

export class sendMailDto {
    @ApiProperty({ type: String, default: 'example email' })
    @IsEmail()
    email: string;
}

export class BlockUser {
    @ApiProperty({ type: Boolean, default: true })
    @IsBoolean()
    block: boolean
}