import {useDispatch, useSelector} from "react-redux";

import {fetchLoginWithData} from "./loginSlice.js";

import './Login.css';

import Preloader from "../Preloader/Preloader.jsx";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import EmailElement from "./EmailElement/EmailElement.jsx";
import PasswordElement from "./PasswordElement.jsx";

import {schema} from "./schema.js";
import {yupResolver} from "@hookform/resolvers/yup/src/index.js";

// To-Do: Нужно заредачить под React-Hook-Form!!!!
const Login = () => {
    const dispatch = useDispatch();

    const {
        register, handleSubmit, formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const loading = useSelector(state => state.auth.loading);
    const isAuth = useSelector(state => state.auth.isAuth);

    if (isAuth) return <Navigate to="/profile"/>;
    if (loading) return <Preloader/>;

    const onSubmit = (data) => {
        console.log(data);
        dispatch(fetchLoginWithData({...data}));
    }

    console.log(errors);

    return (
        <form className={"login"} onSubmit={handleSubmit(onSubmit)}>
            <EmailElement errors={errors} register={register}/>
            <PasswordElement errors={errors} register={register}/>

            <button type={"submit"}>Auth</button>
        </form>
    );
}

export default Login;