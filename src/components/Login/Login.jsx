import { useDispatch, useSelector } from 'react-redux';

import { fetchLoginWithData } from './loginSlice.js';

import './Login.css';

import Preloader from '../Preloader/Preloader.jsx';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import EmailElement from './EmailElement/EmailElement.jsx';
import PasswordElement from './PasswordElement/PasswordElement.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

import { schema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const loading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);
    const isAuth = useSelector((state) => state.auth.isAuth);

    if (isAuth) return <Navigate to="/profile" />;
    if (loading) return <Preloader />;

    const onSubmit = (data) => {
        dispatch(fetchLoginWithData({ ...data }));
    };

    return (
        <>
            {error && <ErrorMessage message={error} />}
            <form className={'login'} onSubmit={handleSubmit(onSubmit)}>
                <p
                    style={{
                        color: 'red',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    For testing you can use this email and password: <br />
                    oleksandrrq@gmail.com <br /> Sasha123@
                </p>
                <EmailElement errors={errors} register={register} />
                <PasswordElement errors={errors} register={register} />

                <button disabled={loading} type={'submit'}>
                    Auth
                </button>
            </form>
        </>
    );
};

export default Login;
