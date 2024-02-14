import { Delete, Settings } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_ColumnFiltersState, type MRT_PaginationState, type MRT_SortingState } from 'material-react-table';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import History from '../../Router/History';
import adminApi from '../../apis/adminApi';
import { Invoice, ListResponse } from '../../models';
import { formatCurrencyVND, handlePrice } from '../../utils';
import SettingMenu from './Components/SettingMenu';

interface CustomDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    orderSelect: Invoice | null;
    setOrderSelect: (value: Invoice | null) => void;
    setIsUpdate: (value: boolean) => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, setOpen, orderSelect, setOrderSelect, setIsUpdate }) => {
    const handleClose = () => {
        setOpen(false);
        setOrderSelect(null);
    };
    const { enqueueSnackbar } = useSnackbar();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const handleSelectChange = (value: string) => {
        setSelectedOption(value);
    };

    const handleUpdateUser = async () => {
        if (orderSelect) {
            if (orderSelect.status !== selectedOption && selectedOption) {
                await adminApi
                    .updateStatusOrder(orderSelect._id, selectedOption)
                    .then(() => {
                        setIsUpdate(true);
                        enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
                    })
                    .catch(() => {
                        enqueueSnackbar('Cập nhật không thành công', { variant: 'error' });
                    });
            } else enqueueSnackbar('Cập nhật không thành công', { variant: 'error' });
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} className="w-full">
            <DialogTitle className=" ">
                Thay đổi trạng thái của đơn hàng của <span className="text-red-500">{orderSelect?.orderBy.name}</span> có số tiền là{' '}
                {handlePrice(orderSelect?.total || 0)}VND
            </DialogTitle>
            <DialogContent className="my-2">
                <Select
                    className="w-full"
                    labelId="status-label"
                    id="status-select"
                    value={selectedOption || orderSelect?.status}
                    onChange={(e) => handleSelectChange(e.target.value)}
                >
                    <MenuItem value="Cancelled">Hủy Đơn</MenuItem>
                    <MenuItem value="Processing">Chờ xác nhận</MenuItem>
                    <MenuItem value="Delivering">Đang giao hàng</MenuItem>
                    <MenuItem value="Success">Đã Thành Công</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
                <Button onClick={handleClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleUpdateUser} color="primary">
                    Cập nhật
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const InvoicePaging = () => {
    const location = useLocation();
    const [data, setData] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [opentDialog, setOpenDialog] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [orderSelect, setorderSelect] = useState<Invoice | null>(null);
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
        const idData = row.map((item: any) => item.original.id);
        console.log(idData);
        (async () => {
            try {
                // await adminApi.deleteFood(idData);
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
                const res = (await adminApi.getPagingOrder(pagination)) as unknown as ListResponse;
                setData(res.data);
                setRowCount(res.count_page * pagination.pageSize);
            } catch (error) {
                setIsError(true);
                console.error(error);
                return;
            }
            setIsUpdate(false);
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        };
        fetchData();
    }, [columnFilters, globalFilter, isDel, pagination.pageIndex, pagination.pageSize, sorting, isUpdate]);
    const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
        () => [
            // { accessorKey: '_id', header: 'ID' },
            {
                accessorKey: 'orderBy.name',
                header: 'Tên Khách hàng',
                Cell: ({ cell }) => <span className="font-semibold">{cell.row.original.orderBy.name}</span>
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái đơn hàng',
                Cell: ({ cell }) => {
                    switch (cell.row.original.status) {
                        case 'Cancelled':
                            return <span className="text-red-500 font-semibold uppercase text-base">đã hủy</span>;
                        case 'Processing':
                            return <span className="">đang chờ xác nhận</span>;
                        case 'Delivering':
                            return <span className="text-green-500 font-semibold uppercase text-base">đang giao hàng</span>;
                        case 'Success':
                            return <span className="text-green-700 font-semibold uppercase text-base">thành công</span>;
                        default:
                            return <span className="">Trạng thái không xác định</span>;
                    }
                }
            },
            { accessorKey: 'total', header: 'Giá trị đơn hàng', Cell: ({ cell }) => formatCurrencyVND(cell.getValue<string>()) },
            { accessorKey: 'createdAt', header: 'Ngày tạo đơn', Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format('DD-MM-YYYY') }
        ],
        []
    );

    return (
        <Box sx={{ height: '100%' }}>
            <SettingMenu anchorRef={settingRef} open={open} setOpen={setOpen} />
            <CustomDialog open={opentDialog} setOpen={setOpenDialog} setIsUpdate={setIsUpdate} orderSelect={orderSelect} setOrderSelect={setorderSelect} />
            <MaterialReactTable
                muiTablePaperProps={{ sx: { height: '100%' } }}
                muiTableContainerProps={{ sx: { height: 'calc(100% - 112px)' } }}
                columns={columns}
                data={data}
                // enableRowSelection
                manualFiltering
                manualPagination
                muiTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                        setorderSelect(row.original);
                        setOpenDialog(true);
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
                        <Typography sx={{ fontSize: '22px', fontWeight: 500, mr: '10px',textTransform:'capitalize' }}>Hóa Đơn</Typography>
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
