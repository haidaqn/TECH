import { IsNotEmpty } from 'class-validator';
import { User } from '../models/user.model';

export class CreateUserDto {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
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
    @IsNotEmpty() email: string;
    @IsNotEmpty() password: string;
}

export class EmailDto {
    @IsNotEmpty()
    email: string;
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
}

export interface AuthResponseRegister {
    email: string;
    token: string;
}

export interface DataOrder {
    id: string;
    title: string;
    quantity: number;
    price: number;
    img: string;
    color: string;
    reset?: boolean;
    add: boolean;
}

export interface UpdateInfoUser {
    name?: string;
    mobile?: string;
    avatar?: string;
    address?: string;
}

export interface ChangePasswordUser {
    oldPassword: string;
    newPassword: string;
    enterNewPassword: string;
}
