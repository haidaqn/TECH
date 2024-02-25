import ProductApi from '@/api/productApi';
import { useAppSelector } from '@/app/hooks';
import { Breadcrumbs, PathItem, ProductItem } from '@/components/common';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchContext } from '@/context';
import { useDebounce } from '@/hooks';
import { BaseModel, Product, QuerryProduct } from '@/models';
import History from '@/router/History';
import { Color, generateRange } from '@/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Products = () => {
    const location = useLocation();
    const { data } = useAppSelector((state) => state.categories);
    const [productData, setProductData] = useState<Product[]>([]);
    const [openSelectPrice, setOpenSelectPrice] = useState<boolean>(false);
    const [openSelectColor, setOpenSelectColor] = useState<boolean>(false);
    const [openSelectCategory, setOpenSelectCategory] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const { searchQuery } = useSearchContext();
    const urlRouter = new URLSearchParams(location.search);
    const searchDebounce = useDebounce(searchQuery, 1000);
    const [isLoading, setLoading] = useState<boolean>(false);

    const [query, setQuery] = useState<QuerryProduct>({
        page: 1,
        limit: 8,
        category: urlRouter.get('category') || undefined,
        search: urlRouter.get('search') || undefined,
    });

    useEffect(() => {
        setQuery((prev) => ({ ...prev, search: searchQuery }));
    }, [searchDebounce]);

    useEffect(() => {
        const fetchData = async () => {
            const updatedSearchParmas = new URLSearchParams(location.search);
            updatedSearchParmas.set('page', `${query.page}`);
            updatedSearchParmas.set('limit', `${query.limit}`);
            const categoryURL = updatedSearchParmas.get('category');
            let shouldUpdateQuery = false;
            if (query.priceTo) updatedSearchParmas.set('priceTo', `${query.priceTo}`);
            else updatedSearchParmas.delete('priceTo');
            if (query.priceEnd) updatedSearchParmas.set('priceEnd', `${query.priceEnd}`);
            else updatedSearchParmas.delete('priceEnd');
            if (query.color) {
                if (query.color !== updatedSearchParmas.get('color')) {
                    setQuery((prev: QuerryProduct) => ({ ...prev, page: 1 }));
                }
                updatedSearchParmas.set('color', `${query.color}`);
            } else updatedSearchParmas.delete('color');

            if (query.search) {
                updatedSearchParmas.set('search', `${query.search}`);
            } else updatedSearchParmas.delete('search');

            if (query.category) {
                if (query.category !== categoryURL)
                    setQuery((prev: QuerryProduct) => ({ ...prev, page: 1 }));
                updatedSearchParmas.set('category', `${query.category}`);
            } else {
                if (!shouldUpdateQuery) updatedSearchParmas.delete('category');
                else {
                    shouldUpdateQuery = true;
                    if (categoryURL)
                        setQuery((prev: QuerryProduct) => ({ ...prev, category: categoryURL }));
                    updatedSearchParmas.set('category', `${query.category}`);
                }
            }
            History.push({ search: updatedSearchParmas.toString() });
            setLoading(true);
            try {
                // console.log(query)
                const response: unknown = await ProductApi.getProduct(query);
                const responseNew = response as BaseModel<Product>;
                setTotalCount(responseNew.count_page);
                setProductData(responseNew.data);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [
        query.page,
        query.priceTo,
        query.priceEnd,
        query.color,
        query.category,
        query.search,
        // searchQuery,
    ]);

    const breadcrumbs: PathItem[] = [
        {
            text: 'Trang chủ',
            path: '/store',
        },
        {
            text: `Sản phẩm`,
            path: `/store/products`,
        },
        ...(query.category
            ? [
                  {
                      text: query.category,
                      path: `#`,
                  },
              ]
            : []),
    ];

    return (
        <div className="flex flex-col gap-4 w-full">
            <Breadcrumbs items={breadcrumbs} />
            <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
                <div className="flex items-center justify-between gap-4 w-full ">
                    <div className="flex items-center justify-start gap-4 ">
                        <Popover open={openSelectCategory} onOpenChange={setOpenSelectCategory}>
                            <PopoverTrigger asChild>
                                <Button
                                    className="btn flex gap-2 bg-white capitalize text-black"
                                    variant="outline"
                                >
                                    <Icons.filter />
                                    {query.category ? query.category : 'Category'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Command>
                                    <ScrollArea className="max-h-[450px]">
                                        {data.length > 0 ? (
                                            <CommandGroup>
                                                <CommandItem
                                                    value={undefined}
                                                    onSelect={() => {
                                                        setQuery((prev: QuerryProduct) => ({
                                                            ...prev,
                                                            category: undefined,
                                                        }));
                                                        setOpenSelectCategory(false);
                                                    }}
                                                >
                                                    ALL
                                                </CommandItem>
                                                {data.map((category, index) => (
                                                    <CommandItem
                                                        key={index + index + category._id}
                                                        value={`${category.title}`}
                                                        onSelect={(currentValue: string) => {
                                                            setQuery((prev: QuerryProduct) => ({
                                                                ...prev,
                                                                category:
                                                                    prev.category !==
                                                                    currentValue[0].toUpperCase() +
                                                                        currentValue.slice(1)
                                                                        ? currentValue[0].toUpperCase() +
                                                                          currentValue.slice(1)
                                                                        : prev.category,
                                                            }));
                                                            setOpenSelectCategory(false);
                                                        }}
                                                        className={`capitalize ${
                                                            query.category === category.title &&
                                                            'bg-gray-300 '
                                                        }`}
                                                    >
                                                        {category.title}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        ) : (
                                            <CommandEmpty>
                                                không có loại sản phẩm nào !
                                            </CommandEmpty>
                                        )}
                                    </ScrollArea>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <Popover open={openSelectPrice} onOpenChange={setOpenSelectPrice}>
                            <PopoverTrigger asChild>
                                <Button
                                    className="btn capitalize flex gap-2 bg-white text-black"
                                    variant="outline"
                                >
                                    <Icons.filter />
                                    price
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="capitalize flex gap-5 w-full">
                                <div className="flex items-center justify-center gap-3 text-lg">
                                    từ
                                    <Input
                                        className="border"
                                        type="text"
                                        value={query.priceTo || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setQuery((prev: QuerryProduct) => ({
                                                ...prev,
                                                priceTo:
                                                    prev.priceTo !== +e.target.value
                                                        ? +e.target.value
                                                        : prev.priceTo,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-center gap-3 text-lg">
                                    đến
                                    <Input
                                        className="border"
                                        type="text"
                                        value={query.priceEnd || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setQuery((prev: QuerryProduct) => ({
                                                ...prev,
                                                priceEnd:
                                                    prev.priceEnd !== +e.target.value
                                                        ? +e.target.value
                                                        : prev.priceEnd,
                                            }))
                                        }
                                    />
                                </div>
                                <Button
                                    onClick={() => {
                                        setQuery((prev: QuerryProduct) => ({
                                            ...prev,
                                            priceEnd: undefined,
                                            priceTo: undefined,
                                        }));
                                        setOpenSelectPrice(false);
                                    }}
                                >
                                    reset
                                </Button>
                            </PopoverContent>
                        </Popover>
                        <Popover open={openSelectColor} onOpenChange={setOpenSelectColor}>
                            <PopoverTrigger asChild>
                                <Button
                                    className="btn capitalize flex gap-2 bg-white text-black"
                                    variant="outline"
                                >
                                    <Icons.filter />
                                    {query.color ? query.color : 'color'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Command>
                                    <ScrollArea className=" max-h-[200px]">
                                        <CommandGroup>
                                            <CommandItem
                                                value={undefined}
                                                onSelect={() => {
                                                    setQuery((prev: QuerryProduct) => ({
                                                        ...prev,
                                                        color: undefined,
                                                    }));
                                                    setOpenSelectColor(false);
                                                }}
                                            >
                                                ALL
                                            </CommandItem>
                                            {Color.map((item, index) => (
                                                <CommandItem
                                                    key={index + index + item}
                                                    value={`${item}`}
                                                    onSelect={(currentValue: string) => {
                                                        setQuery((prev: QuerryProduct) => ({
                                                            ...prev,
                                                            color:
                                                                prev.color !== currentValue
                                                                    ? currentValue
                                                                    : prev.color,
                                                        }));
                                                        setOpenSelectColor(false);
                                                    }}
                                                    className={`capitalize ${
                                                        query.color === item && 'bg-gray-300 '
                                                    }`}
                                                >
                                                    {item}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </ScrollArea>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                {isLoading ? (
                    <div className="w-[20vw] relative flex items-center justify-center h-[40vh]">
                        <ReloadIcon scale={150} className="mr-2 h-4 w-4 animate-spin" />
                    </div>
                ) : (
                    <>
                        {productData.length !== 0 ? (
                            <>
                                <div className="grid grid-cols-4 gap-4">
                                    {productData.map((item, index) => (
                                        <div
                                            className="col-span-1 flex items-center justify-center"
                                            key={index + index}
                                        >
                                            <ProductItem {...item} />
                                        </div>
                                    ))}
                                </div>
                                <Pagination>
                                    <PaginationContent>
                                        {totalCount >= 3 && (
                                            <PaginationItem className="cursor-pointer">
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={() =>
                                                        setQuery((prev: QuerryProduct) => ({
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
                                                        setQuery((prev: QuerryProduct) => ({
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
                                                        setQuery((prev: QuerryProduct) => ({
                                                            ...prev,
                                                            page: totalCount,
                                                        }))
                                                    }
                                                />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            </>
                        ) : (
                            <img
                                src="/assets/productNotfound.png"
                                alt=""
                                className="w-[17vw] mt-5"
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
