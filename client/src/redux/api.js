import axios from "axios"
import { emailVerifyFailure, emailVerifyStart, emailVerifySuccess, signInFailure, signInStart, signInSuccess } from "./slices/userSlice";
import toast from "react-hot-toast";

const API_URL = "api"
// const API_URL = import.meta.env.MODE = "developement" ? "http://localhost:3000/api" : "/api"



export const signup = async (data, dispatch, navigate) => {
    dispatch(signInStart());
    try {
        const res = await axios.post(`${API_URL}/auth/signup`, data);

        // console.log(res);
        toast.success(res.data.message);
        dispatch(signInSuccess(res.data.user))
        navigate("/verify-email");

    } catch (error) {
        toast.error(error.response.data.message);
        dispatch(signInFailure());
    }
}

export const verifyEmail = async (data, dispatch, navigate) => {

    dispatch(emailVerifyStart());
    try {
        const res = await axios.post(`${API_URL}/auth/verify-email`, { code: data });

        // console.log(res);
        toast.success(res.data.message);
        dispatch(emailVerifySuccess(res.data.user))
        navigate("/");

    } catch (error) {
        console.log(error);
        dispatch(emailVerifyFailure(error.response.data.message));
    }
}

export const forgotPassword = async (email, setLoading, setIsSubmitted) => {
    setLoading(true)
    try {
        const res = await axios.post(`${API_URL}/auth/forgot-password`, { email });

        // console.log(res);
        toast.success(res.data.message);
        setLoading(false);
        setIsSubmitted(true);

    } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false)
    }
}

export const resetPassword = async (token, password, navigate, setLoading) => {
    setLoading(true)
    try {
        const res = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });

        // console.log(res);
        setLoading(false);
        toast.success("Password reset successfully, redirecting to login page...");
        setTimeout(() => {
            navigate("/signin");
        }, 2000);

    } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false)
    }
}

export const signin = async (data, dispatch, navigate) => {
    dispatch(signInStart());
    try {
        const res = await axios.post(`${API_URL}/auth/login`, data);

        // console.log(res);
        toast.success(res.data.message);
        dispatch(signInSuccess(res.data.user))
        navigate("/");

    } catch (error) {
        toast.error(error.response.data.message);
        dispatch(signInFailure());
    }
}