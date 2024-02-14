import { Delete, Settings } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import * as dayjs from 'dayjs';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_ColumnFiltersState, type MRT_PaginationState, type MRT_SortingState } from 'material-react-table';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import History from '../../Router/History';
import adminApi from '../../apis/adminApi';
import { ListResponse, User } from '../../models';
import SettingMenu from './Components/SettingMenu';

interface CustomDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    valueSelect: string;
    userSelect: User | null;
    setUserSelect: (value: User | null) => void;
    setIsUpdate: (value: boolean) => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, setOpen, valueSelect, userSelect, setUserSelect, setIsUpdate }) => {
    const handleClose = () => {
        setOpen(false);
        setUserSelect(null);
    };
    const { enqueueSnackbar } = useSnackbar();
    const [selectedOption, setSelectedOption] = useState<string>(valueSelect);
    const handleSelectChange = (value: string) => {
        setSelectedOption(value);
    };

    const handleUpdateUser = async () => {
        if (userSelect) {
            if (selectedOption === '2' && userSelect.isBlocked === false) {
                const res = await adminApi.updateIsBlockUser(true, userSelect._id);
                console.log(res);
                setIsUpdate(true);
                enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
            }
            if (selectedOption === '1' && userSelect.isBlocked === true) {
                const res = await adminApi.updateIsBlockUser(false, userSelect._id);
                console.log(res);
                setIsUpdate(true);
                enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
            }
            if ((selectedOption === '1' && userSelect.isBlocked === false) || (selectedOption === '2' && userSelect.isBlocked === true)) {
                enqueueSnackbar('Cập nhật không thành công', { variant: 'error' });
            }
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} className="">
            <DialogTitle className="w-[500px]">Thay đổi trạng thái của {userSelect?.name}</DialogTitle>
            <DialogContent className="my-2">
                <Select
                    className="w-full"
                    labelId="status-label"
                    id="status-select"
                    value={selectedOption}
                    onChange={(e) => handleSelectChange(e.target.value)}
                >
                    <MenuItem value="1">Bình thường</MenuItem>
                    <MenuItem value="2">Khóa</MenuItem>
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

export const Customer = () => {
    const location = useLocation();
    const [data, setData] = useState<User[]>([]);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [userSelect, setUserSelect] = useState<User | null>(null);
    const [opentDialog, setOpenDialog] = useState<boolean>(false);
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
                await adminApi.deleteUser(idData);
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

            // Update the location object with the new search parameters
            History.push({ search: updatedSearchParams.toString() });
            try {
                const res = (await adminApi.getAllUser(pagination)) as unknown as ListResponse;
                console.log(res);
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
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            { accessorKey: 'name', header: 'Tên người dùng' },
            { accessorKey: 'mobile', header: 'Số điện thoại' },
            { accessorKey: 'email', header: 'Gmail' },
            {
                accessorKey: 'isBlocked',
                header: 'Trạng thái',
                Cell: ({ cell }) =>
                    cell.row.original.isBlocked === false ? (
                        <span className="text-green-500 font-bold  capitalize">bình thường</span>
                    ) : (
                        <span className="text-red-500 font-bold  capitalize">đã khóa</span>
                    )
            },
            {
                accessorKey: 'createdAt',
                header: 'Ngày tạo',
                Cell: ({ cell }) => <span>{dayjs(cell.row.original.createdAt).format('h:mm A DD/MM/YYYY')}</span>
            }
        ],
        []
    );
    return (
        <Box sx={{ height: '100%' }}>
            <SettingMenu anchorRef={settingRef} open={open} setOpen={setOpen} />
            <CustomDialog
                open={opentDialog}
                setOpen={setOpenDialog}
                valueSelect={userSelect?.isBlocked === true ? '2' : '1'}
                userSelect={userSelect}
                setUserSelect={setUserSelect}
                setIsUpdate={setIsUpdate}
            />
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
                        setUserSelect(row.original);
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
                    <Stack direction="row" alignItems="center" className="">
                        <Typography sx={{ fontSize: '22px', fontWeight: 500, mr: '10px', textTransform: 'capitalize' }}>Người Dùng</Typography>
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
