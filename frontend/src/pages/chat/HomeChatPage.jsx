import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppSidebar } from "@/component/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderComponent from "@/component/header/HeaderComponent";
import ChatWindow from "@/component/chat/ChatWindow";

import { getLoggedInUser } from "@/store/slices/authSlice";
import { resetActiveChat, setActiveChat } from "@/store/slices/chatSlice";

import { useToast } from "@/hooks/use-toast";

const HomeChatPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { activeChat } = useSelector((state) => state.chat);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/auth");
        }
        if (token) {
            dispatch(getLoggedInUser());
        }

        // Load activeChat from localStorage
        const savedChat = localStorage.getItem("activeChat");
        if (savedChat) {
            dispatch(setActiveChat(JSON.parse(savedChat)));
        }
    }, [dispatch]);

    // Save activeChat in localStorage when it changes
    useEffect(() => {
        if (activeChat) {
            localStorage.setItem("activeChat", JSON.stringify(activeChat));
        }
    }, [activeChat]);

    const handleLogout = () => {
        localStorage.clear();
        dispatch(resetActiveChat());
        toast({
            duration: 1500,
            variant: "destructive",
            title: "Logged out successfully",
        });
        navigate("/auth");
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="bg-white w-full max-h-screen relative flex flex-col ">
                <HeaderComponent user={user} handleLogout={handleLogout} />
                <div className="flex-1 flex items-center justify-center p-4">
                    {activeChat ? <ChatWindow selectedUser={activeChat} /> : <p className="text-center text-gray-500">Select a user to start chatting.</p>}
                </div>
            </main>
        </SidebarProvider>
    );
};

export default HomeChatPage;
