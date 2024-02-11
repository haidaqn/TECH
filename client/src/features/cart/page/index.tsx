import orderApi from '@/api/orderApi';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { cartActions as actions } from '@/features/cart/CartSlice';
import { handlePrice } from '@/utils';
import { useMemo } from 'react';
import { ItemCart } from './ItemCart';
import { useInforUser } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export const Cart = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const { lengthProduct, dataStore } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const user = useInforUser()
    const navigate = useNavigate()
    const totalPirce = useMemo(
        () => dataStore.reduce((sum, item) => item.price * item.quantity + sum, 0),
        [lengthProduct]
    );

    const handleCreateOrder = async () => {
        try {
            console.log(user?.address)
            if (user?.address === undefined) {
                navigate('/user/account/profile');
                toast({
                    title: 'Tạo đơn hàng thất bại!',
                    description: 'Bạn chưa có địa chỉ giao hàng',
                    variant: 'destructive',
                });
                setOpen(false)
            } else {
                await orderApi
                    .createOrder()
                    .then(() => {
                        dispatch(actions.resetCart());
                        setOpen(false);
                        toast({
                            title: 'Tạo đơn hàng thành công!',
                            description: 'Bạn đã tạo đơn hàng thành công!',
                        });
                    })
                    .catch((err: any) => {
                        console.log(err);
                        toast({
                            title: 'Tạo đơn hàng thất bại!',
                            description: err.message,
                            variant: 'destructive',
                        });
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="flex flex-col gap-4 w-[600px]">
                <SheetHeader>
                    <SheetTitle className="text-center">Giỏ Hàng</SheetTitle>
                </SheetHeader>
                {lengthProduct > 0 ? (
                    <>
                        <ScrollArea className="h-[90%] flex items-center flex-col gap-3 justify-center">
                            {dataStore.map((item, index) => (
                                <ItemCart {...item} key={index + index + item.id} />
                            ))}
                        </ScrollArea>
                        <div className="flex items-center justify-between">
                            <span className="capitalize">tổng tiền :</span>
                            <span>{handlePrice(totalPirce)}</span>
                        </div>
                        <Button onClick={() => handleCreateOrder()}>TẠO ĐƠN</Button>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <img src="/assets/cartimg.png" className="" alt="" />
                        <span className="capitalize text-lg font-medium">
                            chưa có sản phẩm nào trong giỏ hàng
                        </span>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};
