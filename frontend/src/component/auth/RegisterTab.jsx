import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormImageComponent, FormInputComponent, FormLabelComponent } from "../form/FormComponent";
import { LoadingBtnComponent, SubmitButtonComponent } from "../buttons/button-state-component";

import { registerUserSlice } from "@/store/slices/authSlice";

import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const RegisterTab = () => {
    const [pic, setPic] = useState();
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const userRegisterDTO = Yup.object({
        fullName: Yup.string()
            .matches(/^([A-Za-z]+(?:\s[A-Za-z]+){1,2})$/, "Full name must contain at least a first name and last name, or a middle name.")
            .required("Full name is required."),
        email: Yup.string().email().required("Email is required."),
        password: Yup.string().required("Password is required."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords do not match.")
            .required("Confirm password is required."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userRegisterDTO),
    });

    const registerAction = async (data) => {
        const userData = { ...data, pic };

        dispatch(registerUserSlice(userData))
            .unwrap()
            .then(() => {
                toast({
                    title: "Registration Successful",
                    description: "Please login to continue",
                    variant: "default",
                    duration: 1500,
                });
            })
            .catch(() => {
                toast({
                    title: "Registration Failed",
                    description: "Cannot register user",
                    variant: "destructive",
                });
            });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="border-b border-slate-100 dark:border-slate-700 p-3">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Create Account</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Fill in your details to get started</p>
            </div>
            <div className="py-3 px-6">
                <form onSubmit={handleSubmit(registerAction)}>
                    <div className="space-y-3">
                        <div>
                            <FormLabelComponent htmlFor="fullName" label="Full name" />
                            <FormInputComponent type="text" name="fullName" placeholder="Enter your full name" control={control} errorMsg={errors?.fullName?.message} />

                            <FormLabelComponent htmlFor="email" label="Email" />
                            <FormInputComponent type="email" name="email" placeholder="Enter your email" control={control} errorMsg={errors?.email?.message} />

                            <FormLabelComponent htmlFor="password" label="Password" />
                            <FormInputComponent type="password" name="password" placeholder="Enter password" control={control} errorMsg={errors?.password?.message} />

                            <FormLabelComponent htmlFor="confirmPassword" label="Confirm password" />
                            <FormInputComponent
                                type="password"
                                name="confirmPassword"
                                placeholder="Enter confirm password"
                                control={control}
                                errorMsg={errors?.confirmPassword?.message}
                            />

                            <FormLabelComponent htmlFor="pic" label="Profile picture" />
                            <FormImageComponent errorMsg={errors?.pic?.message} setPic={setPic} />
                        </div>
                    </div>

                    <div className="my-2">{loading ? <LoadingBtnComponent /> : <SubmitButtonComponent label="Create account" />}</div>
                </form>
            </div>
        </motion.div>
    );
};

export default RegisterTab;
