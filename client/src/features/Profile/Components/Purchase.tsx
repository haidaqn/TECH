import orderApi from '@/api/orderApi';
import { PurchaseItem } from '@/components/common';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';
import { ListResponse, PagingOrder, ProductOrder } from '@/models';
import History from '@/router/History';
import { generateRange } from '@/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const Purcharse = () => {
    const location = useLocation();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(true);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [query, setQuery] = useState<PagingOrder>({
        page: 1,
        limit: 5,
        status: 'Processing',
    });
    const [dataOrder, setDataOrder] = useState<ProductOrder[]>();
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const updatedSearchParmas = new URLSearchParams(location.search);
            updatedSearchParmas.set('page', `${query.page}`);
            updatedSearchParmas.set('limit', `${query.limit}`);
            updatedSearchParmas.set('status', `${query.status}`);
            History.push({ search: updatedSearchParmas.toString() });
            try {
                const res = (await orderApi.getOrderStatus(query)) as unknown as ListResponse;
                setDataOrder(res.data);
                setLoading(false);
                setTotalCount(res.count_page);
            } catch (error: any) {
                setLoading(false);
                toast({
                    title: 'Lấy dữ liệu thất bại',
                    description: error.message,
                    variant: 'destructive',
                });
            }
        };
        fetchData();
    }, [query.status, query.page, isCheck]);
    return (
        <div className="flex flex-col gap-5">
            <NavigationMenu>
                <NavigationMenuList className="gap-5">
                    <NavigationMenuItem value="cancelled">
                        <NavigationMenuLink
                            asChild
                            className={`capitalize border ${navigationMenuTriggerStyle()} ${
                                query.status === 'Cancelled' && 'bg-gray-100'
                            }`}
                            onClick={() => setQuery((prev) => ({ ...prev, status: 'Cancelled' }))}
                        >
                            <NavLink to="">đã hủy</NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem value="processing">
                        <NavigationMenuLink
                            asChild
                            className={`capitalize border ${navigationMenuTriggerStyle()} ${
                                query.status === 'Processing' && 'bg-gray-100'
                            }`}
                            onClick={() => setQuery((prev) => ({ ...prev, status: 'Processing' }))}
                        >
                            <NavLink to=""> chờ xác nhận</NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem value="delivering">
                        <NavigationMenuLink
                            asChild
                            className={`capitalize border ${navigationMenuTriggerStyle()} ${
                                query.status === 'delivering' && 'bg-gray-100'
                            }`}
                            onClick={() => setQuery((prev) => ({ ...prev, status: 'Delivering' }))}
                        >
                            <NavLink to="">Đang giao hàng</NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem value="success">
                        <NavigationMenuLink
                            asChild
                            className={`capitalize border ${navigationMenuTriggerStyle()} ${
                                query.status === 'Success' && 'bg-gray-100'
                            }`}
                            onClick={() => setQuery((prev) => ({ ...prev, status: 'Success' }))}
                        >
                            <NavLink to="">thành công</NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="">
                {loading ? (
                    <>
                        <div className=" relative flex items-center justify-center h-[40vh]">
                            <ReloadIcon scale={150} className="mr-2 h-4 w-4 animate-spin" />
                        </div>
                    </>
                ) : (
                    <>
                        {dataOrder?.length ? (
                            <div className="flex flex-col gap-5 ">
                                <div className="flex flex-col gap-4">
                                    {dataOrder.map((order) => (
                                        <PurchaseItem
                                            isCheck={isCheck}
                                            setIsCheck={setIsCheck}
                                            products={order.products}
                                            total={order.total}
                                            key={order._id}
                                            status={order.status}
                                            orderID={order._id}
                                        />
                                    ))}
                                </div>
                                <Pagination>
                                    <PaginationContent>
                                        {totalCount >= 3 && (
                                            <PaginationItem className="cursor-pointer">
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={() =>
                                                        setQuery((prev: PagingOrder) => ({
                                                            ...prev,
                                                            page: 1,
                                                        }))
                                                    }
                                                />
                                            </PaginationItem>
                                        )}
                                        {generateRange(1, totalCount).map((page, index) => (
                                            <PaginationItem
                                                className="cursor-pointer"
                                                key={page + index}
                                            >
                                                <PaginationLink
                                                    isActive={page === query.page}
                                                    onClick={() => {
                                                        setQuery((prev: PagingOrder) => ({
                                                            ...prev,
                                                            page: page,
                                                        }));
                                                    }}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        {totalCount >= 3 && (
                                            <PaginationItem className="cursor-pointer">
                                                <PaginationNext
                                                    href="#"
                                                    onClick={() =>
                                                        setQuery((prev: PagingOrder) => ({
                                                            ...prev,
                                                            page: totalCount,
                                                        }))
                                                    }
                                                />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        ) : (
                            <div className='min-h-[250px]'>
                                <span>không có đơn hàng nào</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
