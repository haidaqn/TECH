import authApi from '@/api/authApi';
import { useAppSelector } from '@/app/hooks';
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
import { useToast } from '@/components/ui/use-toast';
import { RegisterForm } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export const RegisterPage = () => {
    const navitage = useNavigate();
    const { logging } = useAppSelector((state) => state.auth);

    const { toast } = useToast();
    const schemaRegister = yup.object().shape({
        name: yup.string().required('Cần nhập tên của bạn!'),
        email: yup.string().email('Vui lòng nhập đúng định dạng!').required('Cần nhập email!'),
        password: yup
            .string()
            .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
            .required('Cần nhập mật khẩu!'),
        passwordConfirm: yup
            .string()
            .required('Cần nhập mật khẩu xác nhận!')
            .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
        mobile: yup
            .string()
            .matches(/^\d{10}$/, 'Vui lòng nhập đúng định dạng số điện thoại')
            .required('Cần nhập số điện thoại!'),
    });
    const formRegister = useForm<RegisterForm>({
        resolver: yupResolver(schemaRegister),
        defaultValues: {
            name:'',
            email: '',
            password: '',
            passwordConfirm: '',
            mobile: '',
        },
    });
    const handleRegister: SubmitHandler<RegisterForm> = async (data) => {
        try {
            await authApi
                .register(data)
                .then(() => {
                    formRegister.reset();
                    toast({
                        title: "Đăng ký thành công",
                    });
                })
                .catch((error: any) => {
                    toast({
                        title: 'Đăng ký thất bại',
                        description: error.message,
                        variant: 'destructive',
                    });
                });
        } catch (error: any) {
            toast({
                title: 'Đăng ký thất bại',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...formRegister}>
            <form onSubmit={formRegister.handleSubmit(handleRegister)} className="space-y-2">
                <FormField
                    control={formRegister.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formRegister.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên của bạn</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên của bạn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formRegister.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập số điện thoại" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formRegister.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật Khẩu</FormLabel>
                            <FormControl>
                                <InputPassword placeholder="Nhập mật khẩu !" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formRegister.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu xác nhận</FormLabel>
                            <FormControl>
                                <InputPassword placeholder="Xác nhận mật khẩu !" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <p
                    className="text-start cursor-pointer hover:opacity-80"
                    onClick={() => {
                        formRegister.reset();
                        navitage('/auth/login');
                    }}
                >
                    <i className="text-sm ">Bạn đã có tài khoản?</i>
                </p>
                <Button type="submit" disabled={logging} className="w-full">
                    {logging && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Đăng ký
                </Button>
            </form>
        </Form>
    );
};
