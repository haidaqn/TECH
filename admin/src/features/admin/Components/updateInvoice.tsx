import { ArrowBackIosNew, CloudUpload, Replay } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Grid, IconButton, Paper, Stack, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminApi from '../../../apis/adminApi';
import { DetailInvoice } from '../../../models';
import { formatCurrencyVND, handlePrice } from '../../../utils';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const UpdateInvoice = () => {
    const { orderID } = useParams();
    const navigate = useNavigate();
    const [tabs, setTabs] = React.useState(0);
    const [loadding, setLoadding] = React.useState(false);
    const [orderStatus, setOrderStatus] = React.useState('');
    const [data, setData] = useState<DetailInvoice | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabs(newValue);
    };
    const handleChangeInvoice = () => {
        async function uploadData() {
            if (data) {
                if (data.status !== orderStatus && orderStatus) {
                    setLoadding(true);
                    await adminApi
                        .updateStatusOrder(orderID || '', orderStatus)
                        .then(() => {
                            setLoadding(false);
                            enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
                        })
                        .catch(() => {
                            setLoadding(false);
                            enqueueSnackbar('Cập nhật không thành công', { variant: 'error' });
                        });
                } else {
                    setLoadding(false);
                    enqueueSnackbar('Cập nhật không thành công', { variant: 'error' });
                }
            }
        }
        uploadData();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = (await adminApi.getDetailOrder(orderID || '')) as unknown as DetailInvoice;
                setData(res);
            } catch (error) {}
        };
        fetchData();
    }, []);

    console.log(data);

    return (
        <>
            {data && orderID ? (
                <Box sx={{ height: '100%' }}>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loadding}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                            p: '10px',
                            boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)',
                            position: 'relative',
                            zIndex: 10
                        }}
                    >
                        <Button
                            size="small"
                            startIcon={<ArrowBackIosNew fontSize="small" />}
                            onClick={() => {
                                navigate('/admin/invoice');
                            }}
                            variant="contained"
                            sx={{ mr: '10px', textTransform: 'revert' }}
                        >
                            Đơn hàng
                        </Button>
                        <IconButton onClick={handleChangeInvoice} size="small" sx={{ mr: '5px' }}>
                            <CloudUpload fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ mr: '5px' }}>
                            <Replay fontSize="small" />
                        </IconButton>
                    </Stack>
                    <Box
                        sx={{
                            background: 'rgb(240, 242, 245)',
                            p: '10px',
                            height: 'calc(100% - 51px)'
                        }}
                        className="overflow-x-hidden overflow-y-auto"
                    >
                        <Grid sx={{ width: '100%', height: '100%' }} container spacing={2}>
                            <Grid item xs={8}>
                                <Box sx={{ width: '100%', height: '100%' }} className="mb-4">
                                    <div className="border   bg-white rounded-md border-gray-300 p-[15px]">
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs onChange={handleChange} value={tabs} aria-label="basic tabs example">
                                                <Tab className="font-bold" label="Cấu hình hóa đơn" {...a11yProps(0)} />
                                            </Tabs>
                                        </Box>
                                        <div>
                                            <Box sx={{ padding: '20px 15px' }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={4}>
                                                                <label htmlFor="type-food-select" className="font-medium ">
                                                                    Trạng thái
                                                                </label>
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <select
                                                                    id="status"
                                                                    defaultValue={data?.status}
                                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                        setOrderStatus(e.target.value);
                                                                    }}
                                                                    className="bg-gray-50 border appearance-none custom-select border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                                >
                                                                    <option value="Cancelled">Hủy Đơn</option>
                                                                    <option value="Processing">Chờ xác nhận</option>
                                                                    <option value="Delivering">Đang giao hàng</option>
                                                                    <option value="Success">Đã Thành Công</option>
                                                                </select>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box>
                                                            <div className="py-2">
                                                                <p className="text-xl font-semibold mb-1">Chi tiết đơn hàng</p>
                                                                <div className=" overflow-x-auto ">
                                                                    <div className="flex flex-col min-w-[300px] ">
                                                                        <Grid className="border-b border-gray-400 py-2" container>
                                                                            <Grid className="font-semibold" item xs={5}>
                                                                                Tên
                                                                            </Grid>
                                                                            <Grid className="text-center font-semibold" item xs={1}>
                                                                                Số lượng
                                                                            </Grid>
                                                                            <Grid className="flex justify-end font-semibold" item xs={3}>
                                                                                Đơn giá
                                                                            </Grid>
                                                                            <Grid className="flex justify-end font-semibold" item xs={3}>
                                                                                Thành tiền
                                                                            </Grid>
                                                                        </Grid>
                                                                        {data.products &&
                                                                            data.products.map((item, index) => (
                                                                                <Grid key={item._id + index} className=" py-2" container>
                                                                                    <Grid item xs={5}>
                                                                                        {item.product.title}
                                                                                    </Grid>
                                                                                    <Grid className="text-center" item xs={1}>
                                                                                        {item.quantity}
                                                                                    </Grid>
                                                                                    <Grid className="flex justify-end" item xs={3}>
                                                                                        {formatCurrencyVND(item.product.price + '')}
                                                                                    </Grid>
                                                                                    <Grid className="flex justify-end" item xs={3}>
                                                                                        {formatCurrencyVND(item.quantity * item.product.price + '')}
                                                                                    </Grid>
                                                                                </Grid>
                                                                            ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Box>
                                                    </Grid>
                                                    <Grid className="border-t border-gray-400 py-2" item xs={12}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={6}>
                                                                <p className="flex gap-2">
                                                                    <span className="font-semibold">Tên khách:</span>
                                                                    {data.orderBy.name || 'Không rõ'}
                                                                </p>
                                                                <p className="flex gap-2">
                                                                    <span className="font-semibold">Email:</span>
                                                                    {data.orderBy.email || 'Không rõ'}
                                                                </p>
                                                                <p className="flex gap-2">
                                                                    <span className="font-semibold">Số điện thoại:</span>
                                                                    {data.orderBy.mobile}
                                                                </p>
                                                                <p className="flex gap-2">
                                                                    <span className="font-semibold"> Địa chỉ:</span>
                                                                    {data.orderBy.address || 'Chưa có địa chỉ'}
                                                                </p>
                                                            </Grid>
                                                            <Grid item xs={6} className="flex justify-end">
                                                                <p className="flex gap-3">
                                                                    <span className="font-semibold">Tổng giá trị đơn hàng:</span>
                                                                    {handlePrice(data.total)} VND
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        width: '100%',
                                        height: '95%',
                                        borderRadius: '8px',
                                        p: '10px'
                                    }}
                                >
                                    Logcat
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            ) : (
                'Chờ lấy dữ liệu'
            )}
        </>
    );
};

export default UpdateInvoice;
