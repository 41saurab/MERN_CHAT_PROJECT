import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterLoginPage from "@/pages/auth/RegisterLoginPage";
import HomeChatPage from "@/pages/chat/HomeChatPage";
import LandingPage from "@/pages/LandingPage";

import { Toaster } from "@/components/ui/toaster";

const RouterConfig = () => {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/chats" element={<HomeChatPage />} />
                    <Route path="/auth" element={<RegisterLoginPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default RouterConfig;
