import ProductApi from '@/api/productApi';
import { Product } from '@/models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Extrainfo } from './Extrainfo';
import { handlePrice, renderStartNumber } from '@/utils';
import { Card } from '@/components/ui/card';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineMinus } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/app/hooks';
import * as actions from '@/features/cart/CartSlice';
import { Breadcrumbs } from '@/components/common';
import { PathItem } from '@/components/common';
import { Comment, Ratings } from '.';
import { ReloadIcon } from '@radix-ui/react-icons';

export const DetailProduct = () => {
    const { pid } = useParams();
    const { toast } = useToast();
    const [dataProduct, setDataProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [color, setColor] = useState<string>('');
    const [imageContent, setImageContent] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductApi.getDetailProduct(pid || '');
                if (response.status) {
                    setDataProduct(response.data);
                    setImageContent(response.data.thumb);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [pid]);

    const breadcrumbs: PathItem[] = [
        {
            text: 'Trang chủ',
            path: '/store',
        },
        {
            text: `${dataProduct?.category}`,
            path: `/store/products?category=${dataProduct?.category}`,
        },
        { text: `${dataProduct?.title}`, path: '#' },
    ];

    const handleQuantityProduct = (add: boolean): void => {
        if (add) {
            if (quantity === dataProduct?.quantity) {
                toast({
                    title: 'Thêm vào giỏ thất bại',
                    description: 'Số lượng sản phẩm đã tối đa !',
                    variant: 'destructive',
                });
            } else setQuantity((prev) => +prev + 1);
        } else {
            if (quantity === 1) {
                toast({
                    title: 'Thêm vào giỏ thất bại',
                    description: 'Tối thiểu là 1 sản phẩm !',
                    variant: 'destructive',
                });
            } else {
                setQuantity((prev) => +prev - 1);
            }
        }
    };

    const handleAddToCart = () => {
        if (!color) {
            toast({
                title: 'Thêm vào giỏ thất bại',
                description: 'Bạn chưa chọn màu cho sản phẩm !',
                variant: 'destructive',
            });
        } else {
            if (dataProduct) {
                dispatch(
                    actions.cartActions.addToCart({
                        id: dataProduct._id,
                        title: dataProduct.title,
                        img: dataProduct.thumb,
                        price: dataProduct.price,
                        color: color,
                        quantity: quantity,
                        add: true,
                    })
                );
            }
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {dataProduct ? (
                <>
                    <Breadcrumbs items={breadcrumbs} />
                    <div className="grid grid-cols-12 gap-4 ">
                        <div className="col-span-5 gap-3 flex flex-col">
                            <Card className="rounded-sm flex items-center justify-center bg-white">
                                <img
                                    src={imageContent || dataProduct?.thumb}
                                    className="w-[50%] p-4"
                                    alt=""
                                />
                            </Card>
                            <div>
                                <Swiper
                                    autoplay={true}
                                    speed={1100}
                                    modules={[Autoplay]}
                                    loop={true}
                                    className="slide-base"
                                    style={{ width: '100%', height: '100%' }}
                                    slidesPerView={2}
                                    spaceBetween={18}
                                    allowTouchMove={true}
                                >
                                    {dataProduct?.images.map((img, index) => (
                                        <SwiperSlide key={index + index + img}>
                                            <Card
                                                className="bg-white cursor-pointer flex items-center justify-center min-w-[200px]"
                                                onClick={() => setImageContent(img)}
                                            >
                                                <img
                                                    src={img}
                                                    className="w-[80%] object-cover p-4"
                                                    alt=""
                                                />
                                            </Card>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className="col-span-4 flex flex-col gap-2 justify-between">
                            <h1 className="text-3xl font-medium">{dataProduct?.title}</h1>
                            <span className="text-xl font-mono">
                                {handlePrice(dataProduct?.price)}
                            </span>
                            <span className="flex items-center text-sm text-gray-400">
                                {renderStartNumber(dataProduct?.totalRatings || 3, 17)}
                                {`  `} {dataProduct?.ratings.length} đánh giá
                            </span>
                            <ul className="list-disc pl-5 text-gray-500">
                                {dataProduct?.description.map((item, index) => (
                                    <li key={index + index + item}>{item}</li>
                                ))}
                            </ul>
                            <div className="flex items-center gap-3">
                                <span>Màu : </span>
                                {dataProduct?.color.map((item, index) => (
                                    <Card
                                        onClick={() =>
                                            setColor((prev) => (prev !== item ? item : prev))
                                        }
                                        className={`rounded-sm uppercase px-2 py-1 font-medium cursor-pointer border-2  ${
                                            color === item && 'border-red-600'
                                        }`}
                                        key={index + index + item}
                                    >
                                        {item}
                                    </Card>
                                ))}
                            </div>
                            <div className="flex gap-3 items-center ">
                                <span>Số lượng : </span>
                                <Card className="mt-2 bg-white flex gap-3 items-center rounded-sm w-fit px-3 py-2">
                                    <span
                                        className="cursor-pointer "
                                        onClick={() => handleQuantityProduct(false)}
                                    >
                                        <AiOutlineMinus size={22} color="black" />
                                    </span>
                                    <span className="text-black">{quantity}</span>
                                    <span
                                        className="cursor-pointer "
                                        onClick={() => handleQuantityProduct(true)}
                                    >
                                        <IoMdAdd size={22} color="black" />
                                    </span>
                                </Card>
                            </div>
                            <Button onClick={() => handleAddToCart()} className="capitalize">
                                thêm vào giỏ
                            </Button>
                        </div>
                        <div className="col-span-3 ">
                            <Extrainfo />
                        </div>
                    </div>
                    <Ratings
                        totalRatings={dataProduct.totalRatings}
                        ratings={dataProduct.ratings}
                    />
                    {dataProduct.ratings.map((item, index) => (
                        <Comment {...item} key={index + index} />
                    ))}
                </>
            ) : (
                <div className="w-full relative flex items-center justify-center h-[40vh]">
                    <ReloadIcon scale={150} className="mr-2 h-4 w-4 animate-spin" />
                </div>
            )}
        </div>
    );
};
