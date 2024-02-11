import { Delete, Settings } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_ColumnFiltersState, type MRT_PaginationState, type MRT_SortingState } from 'material-react-table';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import History from '../../Router/History';
import adminApi from '../../apis/adminApi';
import { ListResponse, Product } from '../../models';
import { formatCurrencyVND } from '../../utils';
import SettingMenu from './Components/SettingMenu';

export const Products = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });
    const [isDel, setIsDel] = useState(false);
    const [open, setOpen] = useState(false);
    const settingRef = useRef<HTMLButtonElement>(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleSelectRows = (row: any) => {
        const idData = row.map((item: any) => item.original._id);
        (async () => {
            try {
                await adminApi.deleteProduct(idData);
                enqueueSnackbar('Xóa thành công', { variant: 'success' });
                setIsDel((item) => !item);
            } catch (error) {
                enqueueSnackbar('Có lỗi xảy ra thử lại sau', { variant: 'error' });
                console.log(error);
            }
        })();
    };
    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }
            const updatedSearchParams = new URLSearchParams(location.search);
            updatedSearchParams.set('page', `${pagination.pageIndex + 1}`);
            updatedSearchParams.set('size', `${pagination.pageSize}`);
            // updatedSearchParams.set('filters', JSON.stringify(columnFilters ?? []));
            // updatedSearchParams.set('globalFilter', globalFilter ?? '');
            // updatedSearchParams.set('sorting', JSON.stringify(sorting ?? []));

            History.push({ search: updatedSearchParams.toString() });
            try {
                const res = (await adminApi.getPagingProduct(pagination)) as unknown as ListResponse
                setData(res.data);
                setRowCount(res.count_page * pagination.pageSize);
            } catch (error) {
                setIsError(true);
                console.error(error);
                return;
            }
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        };
        fetchData();
    }, [columnFilters, globalFilter, isDel, pagination.pageIndex, pagination.pageSize, sorting]);
    const columns = useMemo<MRT_ColumnDef<Product>[]>(
        () => [
            { accessorKey: 'title', header: 'Tên sản phẩm' },
            { accessorKey: 'price', header: 'Giá sản phẩm', Cell: ({ cell }) => formatCurrencyVND(cell.getValue<string>()) },
            { accessorKey: 'category', header: 'Loại sản phẩm' },
            { accessorKey: 'sold', header: 'Số lượng đã bán' },
            { accessorKey: 'quantity', header: 'Số lượng còn lại' }
        ],
        []
    );

    return (
        <Box sx={{ height: '100%' }}>
            <SettingMenu anchorRef={settingRef} open={open} setOpen={setOpen} />
            <MaterialReactTable
                muiTablePaperProps={{ sx: { height: '100%' } }}
                muiTableContainerProps={{ sx: { height: 'calc(100% - 112px)' } }}
                columns={columns}
                data={data}
                enableRowSelection
                manualFiltering
                manualPagination
                muiTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                        navigate(`/admin/update/product/${row.original._id}`);
                    },
                    sx: { cursor: 'pointer' }
                })}
                manualSorting
                muiToolbarAlertBannerProps={
                    isError
                        ? {
                              color: 'error',
                              children: 'Error loading data'
                          }
                        : undefined
                }
                positionToolbarAlertBanner="bottom"
                muiLinearProgressProps={({ isTopToolbar }) => ({
                    sx: {
                        display: isTopToolbar ? 'block' : 'none' //hide bottom progress bar
                    }
                })}
                renderTopToolbarCustomActions={({ table }) => (
                    <Stack direction="row" alignItems="center">
                        <Button
                            disabled={isLoading}
                            sx={{ mr: '10px' }}
                            variant="contained"
                            onClick={() => {
                                navigate('/admin/new/product');
                            }}
                        >
                            Tạo
                        </Button>
                        <Typography sx={{ fontSize: '22px', fontWeight: 500, mr: '10px' }} className='capitalize'>Sản phẩm</Typography>
                        <IconButton ref={settingRef} onClick={handleToggle} size="small" sx={{ mr: '5px' }}>
                            <Settings htmlColor="black" fontSize="small" />
                        </IconButton>
                        {table.getSelectedRowModel().rows.length > 0 && (
                            <IconButton size="small" sx={{ mr: '5px' }} onClick={() => handleSelectRows(table.getSelectedRowModel().rows)}>
                                <Delete fontSize="small" htmlColor="black" />
                            </IconButton>
                        )}
                    </Stack>
                )}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                rowCount={rowCount}
                enableStickyHeader
                state={{
                    columnFilters,
                    globalFilter,
                    isLoading,
                    pagination,
                    showAlertBanner: isError,
                    showProgressBars: isRefetching,
                    sorting
                }}
            />
        </Box>
    );
};
