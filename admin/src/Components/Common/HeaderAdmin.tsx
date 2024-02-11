import { AccessTimeOutlined, ArrowBackIosNew, StorageOutlined } from '@mui/icons-material';
import { Avatar, IconButton, Stack, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avtDefault from '../../assets/img_default.jpg';
import { InvoiceList, ProductList } from '../../constants';
import { MenuAdmin } from './MenuAdmin';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/auth/AuthSlice';

export function HeaderAdmin() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const [openOrder, setOpenOrder] = useState(false);
    const [openInvoice, setOpenInvoice] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [openConfig, setOpenConfig] = useState(false);
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    const handleMoveHome = () => {
        navigate('/', { replace: true });
    };
    const handleRouter = (router: string) => {
        navigate(`${router}`);
    };
    const handleToast = () => {
        enqueueSnackbar('Tính Năng đang phát triển', {
            variant: 'info'
        });
    };

    const handleLogout = () => {
        dispatch(authActions.logout());
        enqueueSnackbar('Đăng xuất thành công !', {
            variant: 'success'
        });
    };

    return (
        <Stack direction="row" className="p-[10px] border-b border-gray-300" justifyContent="space-between ">
            <Stack direction="row" alignItems="center">
                <Stack
                    direction="row"
                    alignItems={'center'}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={handleMoveHome}
                    sx={{
                        cursor: 'pointer',
                        margin: '0 5px',

                        '&:hover': {
                            transform: ' translateX(-5px)',
                            transition: 'all 0.3s'
                        }
                    }}
                >
                    <span className="mr-3">{hovered ? <ArrowBackIosNew /> : <StorageOutlined />}</span>
                    <span className="font-medium mr-2">Trang quản trị</span>
                </Stack>

                <div className="relative">
                    <button
                        onClick={() => handleRouter('customer')}
                        className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1"
                    >
                        Khách hàng
                    </button>
                </div>

                <div className="relative">
                    <button
                        onClick={() => handleRouter('invoice')}
                        className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1"
                    >
                        Hóa đơn
                    </button>
                    <MenuAdmin open={openInvoice} setOpen={setOpenInvoice} items={InvoiceList} />
                </div>
                <div className="relative">
                    <button
                        onClick={() => handleRouter('products')}
                        className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1"
                    >
                        Sản phẩm
                    </button>
                </div>

                <button
                    onClick={() => handleToast()}
                    className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1"
                >
                    Báo cáo
                </button>

                <div className="relative">
                    <button
                        onClick={() => handleToast()}
                        className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1"
                    >
                        Cấu hình
                    </button>
                </div>
            </Stack>
            <Stack direction="row" className="items-center justify-center">
                <Tooltip title="Hoạt động gần đây">
                    <IconButton>
                        <AccessTimeOutlined htmlColor="black" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Đăng xuất">
                    <Avatar onClick={() => handleLogout()} src={avtDefault} className="ml-3" sx={{ borderRadius: '6px', cursor: 'pointer' }} />
                </Tooltip>
            </Stack>
        </Stack>
    );
}
