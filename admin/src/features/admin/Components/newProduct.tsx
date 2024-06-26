import { ArrowBackIosNew, CloudUpload, Delete, Replay, Visibility } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Grid, IconButton, Input, Stack, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoField } from '../../../Components/Common/AutoField';
import adminApi from '../../../apis/adminApi';
import { handlePrice } from '../../../utils';
export interface searchRoot {
    id: number;
    title: string;
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const NewProduct = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [images, setImages] = useState<string>();
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const imgRef = React.useRef<HTMLInputElement | null>(null);
    const [categoryNew, setCategoryNew] = useState<searchRoot | null>(null);
    const [productData, setProductData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        quantity: 0
    });
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
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
                    const response = await adminApi.getUploadImages(images);
                    if (response.status === 200) {
                        setImages(response.data.secure_url);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const sanitizedValue = rawValue.replace(/[^\d,]/g, '');

        // Convert comma-separated string to a numeric value
        const numericValue = parseFloat(sanitizedValue.replace(/,/g, ''));
        if (!isNaN(numericValue)) {
            setProductData((prev) => ({ ...prev, price: handlePrice(numericValue) }));
        } else {
            setProductData((prev) => ({ ...prev, price: '' }));
        }
    };

    const handleImageClick = () => {
        if (imgRef.current !== null) {
            imgRef.current.click();
        }
    };

    const handleCreateProduct = async () => {
        setIsLoading(true);
        try {
            await adminApi
                .createProduct({
                    thumb: images || '',
                    title: productData.title,
                    price: +productData.price,
                    description: productData.description,
                    category: categoryNew?.title || '',
                    quantity: productData.quantity
                })
                .then(() => {
                    setProductData({
                        title: '',
                        price: '',
                        description: '',
                        category: '',
                        quantity: 0
                    });
                    setImages('')
                    enqueueSnackbar('Tạo sản phẩm thành công !', {
                        variant: 'success'
                    });
                })
                .catch(() => {
                    enqueueSnackbar('Tạo sản phẩm không thành công !', {
                        variant: 'error'
                    });
                });
            setIsLoading(false);
        } catch (error) {
            enqueueSnackbar('Tạo sản phẩm không thành công !', {
                variant: 'error'
            });
        }
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Backdrop sx={{ quantity: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
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
                        navigate('/admin/products');
                    }}
                    variant="contained"
                    sx={{ mr: '10px', textTransform: 'revert' }}
                >
                    Sản phẩm
                </Button>
                <IconButton onClick={() => handleCreateProduct()} size="small" sx={{ mr: '5px' }}>
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
                    <Box sx={{ width: '100%', height: '100%' }} className="mb-4 px-5">
                        <p className="font-semibold text-lg mb-2 pt-4">Thêm sản phẩm mới</p>
                        <div className="border   bg-white rounded-md border-gray-300 p-[15px]">
                            <div className="flex w-[100%]">
                                <div className="flex-1 mr-[20px]">
                                    <label className="font-medium text-md block">Tên sản phẩm</label>
                                    <Input
                                        fullWidth
                                        sx={{ height: '50px', fontSize: '25px', p: 0 }}
                                        placeholder="VD:Iphone 15 pro max"
                                        value={productData.title}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductData((prev) => ({ ...prev, title: e.target.value }))}
                                    />
                                    <div className="flex items-center mb-4 mt-3">
                                        <input
                                            id="state-product"
                                            type="checkbox"
                                            defaultChecked={true}
                                            className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded"
                                        />
                                        <label htmlFor="state-product" className="ml-2 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300">
                                            Đang bán
                                        </label>
                                    </div>
                                </div>

                                <div onClick={handleImageClick} className="w-[150px] relative h-[150px] cursor-pointer border">
                                    {images ? (
                                        <>
                                            <Backdrop sx={{ zIndex: '100' }} open={openBackDrop} onClick={() => setOpenBackDrop(false)}>
                                                <img className="w-[400px] object-contain" src={images} alt="Preview" />
                                            </Backdrop>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    '&:hover .tool-img': {
                                                        display: 'flex !important'
                                                    }
                                                }}
                                            >
                                                <img className="w-[100%] h-[100%] object-cover" src={images} alt="Preview" />
                                                <div className="absolute tool-img top-0 left-0 hidden items-center justify-center w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] z-10">
                                                    <IconButton onClick={() => setOpenBackDrop(true)}>
                                                        <Visibility htmlColor="white" />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => {
                                                            setImages('');
                                                        }}
                                                    >
                                                        <Delete htmlColor="white" />
                                                    </IconButton>
                                                </div>
                                            </Box>
                                        </>
                                    ) : (
                                        <img className="w-[100%] h-[100%] object-cover" src="/assets/camera_add.png" alt="Add Image" />
                                    )}
                                    <input
                                        ref={imgRef}
                                        hidden={true}
                                        type="file"
                                        id="imageInput"
                                        onChange={(e) => handleFiles(e)}
                                        name="imageInput"
                                        accept="image/png, image/jpeg"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={'Thông tin sản phẩm'} aria-label="product tabs example">
                                        <Tab label="Thông tin sản phẩm" {...a11yProps(0)} />
                                    </Tabs>
                                </Box>
                                <div>
                                    <Box sx={{ padding: '20px 15px' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <label htmlFor="type-food-select" className="font-medium ">
                                                            Loại sản phẩm
                                                        </label>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <AutoField value={categoryNew} setValue={setCategoryNew} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <label htmlFor="type-food-select" className="font-medium ">
                                                            Số lượng
                                                        </label>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <div className="flex items-end">
                                                            <input
                                                                value={productData.quantity}
                                                                type="string"
                                                                autoComplete="off"
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                                    setProductData((prev) => ({ ...prev, quantity: +e.target.value }))
                                                                }
                                                                className="block px-0 w-[150px]   border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                                            />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <label htmlFor="name-food-select" className="font-medium ">
                                                            Đơn giá
                                                        </label>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <div className="flex items-end">
                                                            đ
                                                            <input
                                                                id="name-food-select"
                                                                value={productData.price}
                                                                type="string"
                                                                autoComplete="off"
                                                                onChange={handleChangePrice}
                                                                className="block px-0 w-[150px]   border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                                            />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ mt: '30px' }}>
                                            <label htmlFor="message" className="block mb-2  font-medium text-gray-900 dark:text-white">
                                                Mô tả sản phẩm
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={4}
                                                value={productData.description}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                                    setProductData((prev) => ({ ...prev, description: e.target.value }))
                                                }
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Viết mô tả về sản phẩm..."
                                            ></textarea>
                                        </Box>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};

export default NewProduct;
