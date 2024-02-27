import { User } from '.';

export interface PayLoad {
    data: User;
    token: string;
    refreshToken?: string;
}
