import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FinalRegister = () => {
    const { status } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    useEffect(() => {
        if (status === 'failed') {
            toast({
                title: 'Tạo tài khoản thất bại',
                variant: 'destructive',
            });
            navigate('/auth/register');
        }
        if (status === 'success') {
            toast({
                title: 'Tạo tài khoản thành công!',
                description: 'Bạn đã tạo tài khoản thành công!',
            });
            navigate('/auth/login');
        }
    }, [status]);
    return <div className="h-screen w-screen bg-gray-100"></div>;
};
