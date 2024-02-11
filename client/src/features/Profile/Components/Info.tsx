import authApi from '@/api/authApi';
import uploadImage from '@/api/uploadImage';
import { useAppDispatch } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useInforUser } from '@/hooks';
import { User } from '@/models';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useRef, useState } from 'react';
import { authActions } from '@/features/auth/AuthSlice';
export interface UserUpdate {
    name?: string;
    mobile?: string;
    address?: string;
    avatar?: string;
}

export const ProfileUser = () => {
    const user = useInforUser();
    const dispath = useAppDispatch();
    const token = localStorage.getItem('access_token');
    const imgRef = useRef<HTMLInputElement | null>(null);
    const { toast } = useToast();
    const [userUpdate, setUserUpdate] = useState<UserUpdate>({
        name: user?.name,
        mobile: user?.mobile,
        address: user?.address || 'Chưa có địa chỉ',
        avatar: user?.avatar,
    });
    const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = e.target;
        if (inputElement.files) {
            const images = new FormData();
            const selectedFiles = inputElement.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                images.append('file', file);
                images.append('upload_preset', 'oksl1k1o');
                try {
                    const response = await uploadImage.upload(images);
                    setUserUpdate((prev) => ({ ...prev, avatar: response.data.secure_url }));
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    const handleUpdateUser = async () => {
        try {
            if (
                !userUpdate.name ||
                userUpdate.name.length < 5 ||
                !userUpdate.mobile ||
                userUpdate.mobile.length !== 10
            ) {
                toast({
                    title: 'Cập nhật thông tin thất bại',
                    description: 'Bạn chưa điền đủ các thông tin cần thiết !',
                    variant: 'destructive',
                });
            } else {
                const res = (await authApi.updateInfoUser(userUpdate)) as unknown as User;
                if (token) {
                    dispath(
                        authActions.loginSuccess({
                            data: res,
                            token,
                        })
                    );
                }
                toast({
                    title: 'Cập nhật thông tin thành công',
                    description: 'Bạn đã cập nhật thông tin thành công',
                });
            }
        } catch (error: any) {
            toast({
                title: 'Cập nhật thông tin thất bại',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    return (
        <div className=" flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-0 border-b-2 w-full pb-2">
                <span className="text-lg font-semibold">Hồ sơ của tôi</span>
                <span className="text-sm text-gray-600">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </span>
            </div>
            <div className="flex gap-5 mt-4">
                <div className="flex-4 px-4 flex flex-col gap-3">
                    <div className="flex gap-6">
                        <span className="flex-1 text-end font-semibold">Tên đăng nhập: </span>
                        <span className="flex-3 text-start">{user?.email}</span>
                    </div>
                    <div className="flex gap-6">
                        <span className="flex-1 text-end font-semibold">Tên: </span>
                        <span className="flex-3 text-start">
                            <Input
                                className="border-[1px]"
                                value={userUpdate?.name}
                                onChange={(e) =>
                                    setUserUpdate((prev) => ({ ...prev, name: e.target.value }))
                                }
                            />
                        </span>
                    </div>
                    <div className="flex gap-6">
                        <span className="flex-1 text-end font-semibold">Số điện thoại: </span>
                        <span className="flex-3 text-start">
                            <Input
                                className="border-[1px]"
                                value={userUpdate?.mobile}
                                onChange={(e) =>
                                    setUserUpdate((prev) => ({ ...prev, mobile: e.target.value }))
                                }
                            />
                        </span>
                    </div>
                    <div className="flex gap-6">
                        <span className="flex-1 text-end font-semibold">Địa chỉ: </span>
                        <span className="flex-3 text-start">
                            <Input
                                className="border-[1px]"
                                value={userUpdate?.address}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setUserUpdate((prev) => ({ ...prev, address: e.target.value }));
                                }}
                            />
                        </span>
                    </div>
                    <div className="flex gap-6 mt-5">
                        <span className="flex-1"></span>
                        <span className="flex-3">
                            <Button className="w-fit" onClick={() => handleUpdateUser()}>
                                Lưu
                            </Button>
                        </span>
                    </div>
                </div>
                <div className="flex-2 border-l-2 pl-3 flex flex-col gap-4 items-center justify-center w-full">
                    <Avatar className="cursor-pointer flex items-center justify-center">
                        <AvatarImage
                            src={
                                userUpdate?.avatar
                                    ? userUpdate.avatar
                                    : 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
                            }
                            alt="@shadcn"
                            className="rounded-full h-32 w-h-32"
                        />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <Button onClick={() => imgRef.current?.click()}>chọn ảnh</Button>
                    <input
                        className="border-[1px]"
                        onChange={(e) => handleFiles(e)}
                        ref={imgRef}
                        hidden
                        type="file"
                        id="file"
                        multiple
                    />
                    <span className="text-sm text-gray-400 text-center">
                        Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
                    </span>
                </div>
            </div>
        </div>
    );
};
