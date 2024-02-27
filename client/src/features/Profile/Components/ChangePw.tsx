import authApi from '@/api/authApi';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputPassword } from '@/components/ui/inputPassword';
import { useToast } from '@/components/ui/use-toast';
import { ChangePasswordUser } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

export const ChangePassword = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const schema = yup.object().shape({
        oldPassword: yup.string().required('Bạn cần nhập mật khẩu cũ !'),
        newPassword: yup
            .string()
            .min(6, 'Mật khẩu mới cần tối thiểu 6 kí tự')
            .required('Bạn cần nhập mới khẩu mới !')
            .notOneOf([yup.ref('oldPassword')], 'Mật khẩu mới không được giống mật khẩu cũ !'),
        enterNewPassword: yup
            .string()
            .min(6, 'Mật khẩu mới cần tối thiểu 6 kí tự !')
            .required('Bạn cần nhập mật khẩu xác nhận !')
            .oneOf([yup.ref('newPassword')], 'Mật khẩu mới chưa khớp nhau !')
            .notOneOf([yup.ref('oldPassword')], 'Mật khẩu mới không được giống mật khẩu cũ !'),
    });

    const form = useForm<ChangePasswordUser>({
        resolver: yupResolver(schema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            enterNewPassword: '',
        },
    });

    const handleChangePassword: SubmitHandler<ChangePasswordUser> = async (
        data: ChangePasswordUser
    ) => {
        try {
            setLoading(true);
            const res = (await authApi.changePassword(data)) as unknown as Boolean;
            if (res) {
                form.reset();
                toast({
                    title: 'Đổi mật khẩu thành công !',
                });
            } else {
                toast({
                    title: 'Đổi mật khẩu thất bại !',
                    variant: 'destructive',
                });
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            toast({
                title: 'Đổi mật khẩu thất bại !',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex flex-col w-full gap-5">
            <h1 className="pb-3 border-b-2 text-xl font-bold">Thay đổi mật khẩu</h1>
            <div className="w-1/2">
                <Form {...form}>
                    <form className="space-y-2" onSubmit={form.handleSubmit(handleChangePassword)}>
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu cũ</FormLabel>
                                    <FormControl>
                                        <InputPassword placeholder="Nhập mật khẩu cũ" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu mới</FormLabel>
                                    <FormControl>
                                        <InputPassword placeholder="Nhập mật khẩu mới" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="enterNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                                    <FormControl>
                                        <InputPassword
                                            placeholder="Nhập lại mật khẩu "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loading} className="w-fit">
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Lưu
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
