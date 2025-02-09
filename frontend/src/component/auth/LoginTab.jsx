import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormInputComponent, FormLabelComponent } from "../form/FormComponent";
import { LoadingBtnComponent, SubmitButtonComponent } from "../buttons/button-state-component";

import { loginUserSlice } from "@/store/slices/authSlice";

import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const LoginTab = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const userLoginDTO = Yup.object({
        email: Yup.string().email().required("Email is required."),
        password: Yup.string().required("Password is required."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userLoginDTO),
    });

    const loginAction = async (data) => {
        dispatch(loginUserSlice(data))
            .unwrap()
            .then(() => {
                toast({
                    duration: 1500,
                    title: "Login Successful",
                    description: "Welcome",
                    variant: "default",
                });
                navigate("/chats");
            })
            .catch(() => {
                toast({
                    title: "Login Failed",
                    description: "Invalid credentials",
                    variant: "destructive",
                });
            });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="border-b border-slate-100 dark:border-slate-700 p-3">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Login to your Account</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Fill in your details to get started</p>
            </div>
            <div className="py-3 px-6">
                <form onSubmit={handleSubmit(loginAction)}>
                    <div className="space-y-3">
                        <div>
                            <FormLabelComponent htmlFor="email" label="Email" />
                            <FormInputComponent type="email" name="email" placeholder="Enter your email" control={control} errorMsg={errors?.email?.message} />

                            <FormLabelComponent htmlFor="password" label="Password" />
                            <FormInputComponent type="password" name="password" placeholder="Enter password" control={control} errorMsg={errors?.password?.message} />
                        </div>
                    </div>

                    <div className="my-2">{loading ? <LoadingBtnComponent /> : <SubmitButtonComponent label="Login" />}</div>
                </form>
            </div>
        </motion.div>
    );
};

export default LoginTab;
