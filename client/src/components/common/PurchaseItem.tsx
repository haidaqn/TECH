import orderApi from '@/api/orderApi';
import ProductApi from '@/api/productApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateComment, ProductItem } from '@/models';
import { generateRange, handlePrice } from '@/utils';
import { useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { boolean, isSchema } from 'yup';
export const PurchaseItem = ({
    products,
    total,
    status,
    orderID,
    setIsCheck,
    isCheck,
}: {
    products: ProductItem[];
    total: number;
    status: string;
    orderID: string;
    setIsCheck: (value: boolean) => void;
    isCheck: boolean;
}) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [open, setOpen] = useState<boolean>(false);
    const [openCancell, setOpenCancell] = useState<boolean>(false);
    const [comment, setComment] = useState<CreateComment>({
        star: 0,
        comment: '',
        idProduct: '',
    });

    const handleCreateRating = async () => {
        try {
            await ProductApi.createComment(comment)
                .then(() => {
                    setOpen(false);
                    setComment({ star: 0, comment: '', idProduct: '' });
                    toast({
                        title: 'Đánh giá thành công!',
                        description: 'Bạn đã đánh giá sản phẩm thành công !',
                    });
                })
                .catch((err: any) => {
                    setOpen(false);
                    toast({
                        title: 'Đánh giá không thành công!',
                        description: err.message,
                        variant: 'destructive',
                    });
                });
        } catch (error: any) {
            toast({
                title: 'Đánh giá không thành công!',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    const handleCancellOrder = async (orderID: string) => {
        const res = await orderApi.changeOrder(orderID);
        if (res) {
            toast({
                title: 'Hủy đơn thành công!',
            });
            setIsCheck(!isCheck);
        } else {
            toast({
                title: 'Hủy đơn không thành công!',
                variant: 'destructive',
            });
        }
        setOpenCancell(false);
    };

    return (
        <Dialog open={openCancell} onOpenChange={setOpenCancell}>
            <Card className="p-4">
                {products.map((product, index) => (
                    <Dialog key={product.product._id + index} open={open} onOpenChange={setOpen}>
                        <div className="border-b py-2 flex gap-5">
                            <img
                                src={product.product.thumb}
                                className="min-w-[80px] w-[120px] transition-transform transform hover:scale-110 cursor-pointer"
                                alt=""
                                onClick={() => navigate(`/store/products/${product.product._id}`)}
                            />
                            <div className="flex flex-col justify-between">
                                <span className="text-lg font-medium">{product.product.title}</span>
                                <span className="capitalize ">màu: {product.color}</span>
                                <span>
                                    x<span className="text-lg">{product.quantity}</span>
                                </span>
                            </div>
                            <div className="flex-1 flex justify-end text-red-600">
                                <div className="flex flex-col justify-between">
                                    <span>{handlePrice(product.product.price)}</span>
                                    {status === 'Success' && (
                                        <button
                                            onClick={() => {
                                                setComment((prev) => ({
                                                    ...prev,
                                                    idProduct: product.product._id,
                                                }));
                                                setOpen(true);
                                            }}
                                            className="bg-gray-500 w-fit px-4 py-1 rounded-lg text-white capitalize hover:opacity-70"
                                        >
                                            đánh giá
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Đánh giá sản phẩm{' '}
                                    <span className="text-xl">{product.product.title}</span>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-4 items-center">
                                    <span className="text-xl font-medium">Sao:</span>
                                    <span className="flex gap-1">
                                        {generateRange(1, 5).map((item) => (
                                            <FaRegStar
                                                onClick={() =>
                                                    setComment((prev) => ({ ...prev, star: item }))
                                                }
                                                key={item}
                                                size={18}
                                                className={` cursor-pointer ${
                                                    item <= comment.star
                                                        ? 'text-red-500 animate-star'
                                                        : ''
                                                }`}
                                            />
                                        ))}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="text-xl font-medium ">Bình luận:</span>
                                    <Textarea
                                        value={comment.comment}
                                        onChange={(e) =>
                                            setComment((prev) => ({
                                                ...prev,
                                                comment: e.target.value,
                                            }))
                                        }
                                        placeholder="Hãy để lại bình luận.."
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => handleCreateRating()}
                                    className="border px-5 py-1 bg-red-500 hover:opacity-90 text-white capitalize rounded-lg"
                                >
                                    đánh giá
                                </button>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
                <span className="float-right pt-2 font-medium text-lg">
                    Thành tiền : <span className="text-red-500">{handlePrice(total)}</span>
                </span>
                {(status === 'Processing' || status === 'Delivering') && (
                    <Button className="mt-3" onClick={() => setOpenCancell(true)}>
                        hủy đơn
                    </Button>
                )}
            </Card>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bạn có chắc chắn muốn hủy đơn hàng này không ?</DialogTitle>
                </DialogHeader>
                <div className="w-full flex justify-between">
                    <Button
                        onClick={() => setOpenCancell(false)}
                        className="bg-gray-700 hover:bg-gray-500"
                    >
                        Không
                    </Button>
                    <Button
                        onClick={() => handleCancellOrder(orderID)}
                        className="bg-red-600 hover:bg-red-400"
                    >
                        Hủy
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
