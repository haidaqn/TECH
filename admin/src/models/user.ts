export interface User {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    role: number;
    __v: number;
    address: string;
}

export interface Role {
    id: number;
    createDate: any;
    status: any;
    authority: string;
}

export interface RootUser {
    totalCount: number;
    users: User[];
    success: boolean;
}
