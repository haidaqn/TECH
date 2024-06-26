import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import adminApi from '@/api/adminApi';
import { useDebounce } from '../../hooks';
import adminApi from '../../apis/adminApi';
export interface searchRoot {
    id: number;
    title: string;
}
interface AutoFieldProps {
    setValue: (val: searchRoot | null) => void;
    value: searchRoot | null;
}

export function AutoField(props: AutoFieldProps) {
    const { setValue, value } = props;
    const [dataRes, setDataRes] = React.useState<searchRoot[]>([]);
    const [tx, setTx] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const debouncedTx = useDebounce({ value: tx, seconds: 300 });
    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await adminApi.getAllCategories();
                setDataRes(res.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        })();
    }, [debouncedTx]); // Re-run effect when 'tx' changes

    const defaultProps = {
        options: dataRes,
        getOptionLabel: (option: searchRoot) => option.title
    };

    return (
        <Autocomplete
            {...defaultProps}
            id="controlled-demo"
            value={value}
            onChange={(event: React.SyntheticEvent, newValue: searchRoot | null) => {
                console.log(event);
                setValue(newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    sx={{ width: '90%' }}
                    {...params}
                    onChange={(e) => {
                        setTx(e.target.value);
                    }}
                    value={tx} // Reflect the current 'tx' value in the input
                    variant="standard"
                />
            )}
        />
    );
}
