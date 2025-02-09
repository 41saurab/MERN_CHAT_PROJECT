import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterTab from "@/component/auth/RegisterTab";
import LoginTab from "@/component/auth/LoginTab";

import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const RegisterLoginPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            toast({
                duration: 1500,
                title: "Already logged in",
                description: "You are already logged in",
            });
            navigate("/chats");
        }
    }, []);

    if (localStorage.getItem("token")) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex min-h-screen items-center justify-center bg-slate-900 p-6 md:p-8"
        >
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700 p-2">
                <Tabs defaultValue="sign-up">
                    <TabsList className="grid w-full grid-cols-2 ">
                        <TabsTrigger value="sign-up">Sign up</TabsTrigger>
                        <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sign-up">
                        <RegisterTab />
                    </TabsContent>
                    <TabsContent value="login">
                        <LoginTab />
                    </TabsContent>
                </Tabs>
            </div>
        </motion.div>
    );
};

export default RegisterLoginPage;
