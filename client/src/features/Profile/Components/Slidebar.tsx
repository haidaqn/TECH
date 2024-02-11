import { Card } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';

export const Slidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2 border-r-2 pr-5 h-full">
            <Card
                onClick={() => navigate('account/profile')}
                className={`p-3 ${
                    location.pathname.includes('profile') && 'font-semibold bg-gray-300'
                } cursor-pointer rounded-lg hover:bg-gray-300`}
            >
                Thông tin cá nhân
            </Card>
            <Card
                onClick={() => navigate('changepassword')}
                className={`p-3 ${
                    location.pathname.includes('changepassword') && 'font-semibold bg-gray-300'
                } cursor-pointer rounded-lg hover:bg-gray-300`}
            >
                Đổi mật khẩu
            </Card>
            <Card
                onClick={() => navigate('purchase')}
                className={`p-3 ${
                    location.pathname.includes('purchase') && 'font-semibold bg-gray-300'
                } cursor-pointer rounded-lg hover:bg-gray-300`}
            >
                Đơn hàng
            </Card>
        </div>
    );
};
