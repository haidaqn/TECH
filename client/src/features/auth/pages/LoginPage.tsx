import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/inputPassword';
import { LoginForm } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authActions } from '../AuthSlice';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';

export function LoginPage() {
    const dispatch = useAppDispatch();
    const navitage = useNavigate();
    const { actionAuth, logging } = useAppSelector((state) => state.auth);
    const { toast } = useToast();
    const schemaLogin = yup.object().shape({
        email: yup
            .string()
            .email('Vui lòng nhập đúng định dạng!')
            .max(255)
            .required('Email không được trống !!'),
        password: yup
            .string()
            .required('Cần nhập mật khẩu!')
            .min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
    });

    const formLogin = useForm<LoginForm>({
        resolver: yupResolver(schemaLogin),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin: SubmitHandler<LoginForm> = (data) => {
        dispatch(authActions.login(data));
    };

    useEffect(() => {
        if (actionAuth == 'Failed') {
            toast({
                title: 'Đăng nhập thất bại!',
                description: 'Tài khoản, mật khẩu không chính xác hoặc có thể đã bị khóa !',
                variant: 'destructive',
            });
        }
    }, [actionAuth, toast]);

    return (
        <Form {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                    control={formLogin.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formLogin.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <InputPassword placeholder="Nhập mật khẩu" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between">
                    <i
                        onClick={() => {
                            formLogin.reset();
                            navitage('/auth/register');
                        }}
                        className="text-sm cursor-pointer hover:opacity-80"
                    >
                        Bạn chưa có tài khoản?
                    </i>
                    <i className="text-sm cursor-pointer hover:opacity-80">Quên mật khẩu?</i>
                </div>
                <Button type="submit" disabled={logging} className="w-full">
                    {logging && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Đăng nhập
                </Button>
            </form>
        </Form>
    );
}
