import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { InputField, PasswordField } from '../../../Components/FormControls';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoginForm } from '../../../models';
import { authActions } from '../AuthSlice';
export function LoginPage() {
    const logging = useAppSelector((state) => state.auth.logging);
    const actionAuth = useAppSelector((state) => state.auth.actionAuth);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const schema = yup.object().shape({
        email: yup.string().required('Cần nhập tài khoản'),
        password: yup.string().required('Cần nhập mật khẩu')
    });

    const form = useForm<LoginForm>({
        resolver: yupResolver(schema)
    });
    const handleLogin: SubmitHandler<LoginForm> = (data) => {
        dispatch(authActions.login(data));
    };
    useEffect(() => {
        if (actionAuth == 'Failed') {
            enqueueSnackbar('Email hoặc mật khẩu không chính xác', {
                variant: 'error'
            });
        }
    }, [actionAuth]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            {logging && <LinearProgress sx={{ position: 'fixed', top: '0px', left: '0px', width: '100%' }} />}
            <Paper
                elevation={8}
                sx={{
                    zIndex: 5,
                    maxWidth: '800px',
                    maxHeight: '350px',
                    width: '100%',
                    height: '70%',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}
            >
                <Stack sx={{ width: '100%', height: '100%', position: 'relative' }} flexDirection={'row'}>
                    <Stack sx={{ flex: '1 1', position: 'relative' }}>
                        <Box
                            sx={{
                                padding: '0 20px 0 20px',
                                width: '100%',
                                margin: '0 auto',
                                mt: '20px'
                            }}
                        >
                            <Box sx={{ marginBottom: '20px' }}>
                                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                                    Đăng nhập
                                </Typography>
                                <span style={{ color: 'rgb(122, 122, 122)' }}>Hãy đăng nhập để tiếp tục</span>
                            </Box>
                            <FormProvider {...form}>
                                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={form.handleSubmit(handleLogin)}>
                                    <InputField label="Tài khoản" name="email" />
                                    <PasswordField label="Mật khẩu" name="password" />
                                    <Button size="large" sx={{ marginTop: 1 }} variant="contained" type="submit" disabled={logging}>
                                        Đăng nhập
                                    </Button>
                                </form>
                            </FormProvider>
                        </Box>
                        <Stack
                            justifyContent={'space-between'}
                            flexDirection={'row'}
                            sx={{
                                width: '100%',
                                padding: '0 20px 0px 20px',
                                marginTop: '12px'
                            }}
                        >
                            <Typography style={{ color: 'blue' }}></Typography>
                            <Typography variant="body2" color="text.secondary">
                                Form by{' '}
                                <Link color="inherit" style={{ textDecoration: 'underline' }} to="https://github.com/haidaqn">
                                    @haidaqn
                                </Link>{' '}
                                {new Date().getFullYear()}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </div>
    );
}
