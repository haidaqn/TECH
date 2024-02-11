import { useAppDispatch } from '@/app/hooks';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cartActions as actions } from '@/features/cart/CartSlice';
import { CartItemData } from '@/models';
import { handlePrice } from '@/utils';
import { AiOutlineMinus } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

export const ItemCart = (props: CartItemData) => {
    const { color, img, price, quantity, title, id } = props;
    const dispatch = useAppDispatch();

    const handleQuantityProduct = async (add: boolean) => {
        if (add) {
            dispatch(
                actions.addToCart({
                    id,
                    color,
                    img,
                    price,
                    quantity: 1,
                    title,
                    add: true,
                })
            );
        } else {
            if (quantity === 1) {
                dispatch(
                    actions.removeCart({
                        ...props,
                        add: false,
                    })
                );
            } else {
                dispatch(
                    actions.deleteCart({
                        ...props,
                        quantity: 1,
                        add: false,
                    })
                );
            }
        }
    };

    return (
        <Card className="border p-2 mb-4 w-full relative">
            <div className="flex gap-3 items-center justify-between">
                <span className="text-lg font-medium">
                    {title.length > 19 ? `${title.slice(0, 15)}...` : title}
                </span>
                <span className="text-red-600 font-medium">{handlePrice(price)}</span>
            </div>
            <div className="flex gap-3 items-center">
                <img src={img} className="w-24" alt="" />
                <div className="flex flex-col gap-3">
                    <span className="capitalize">
                        Màu: <small className="uppercase font-medium">{color}</small>
                    </span>
                    <div>
                        <Card className="mt-2 bg-white flex gap-3 items-center rounded-sm w-fit px-2 py-1">
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
                </div>
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger
                        className="absolute bottom-3 right-3 hover:opacity-60"
                        onClick={() => dispatch(actions.removeCart(props))}
                    >
                        <FaRegTrashAlt size={25} color="black" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>xóa sản phẩm khỏi giỏ hàng</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Card>
    );
};
