import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";

import { getUsers } from "@/store/slices/authSlice";
import { setActiveChat } from "@/store/slices/chatSlice";

import SearchBox from "./SearchBox";
import UserListSkeleton from "../skeleton/UserListSkeleton";

import { motion } from "framer-motion";

export function AppSidebar() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const { userList, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const debounce = setTimeout(() => {
            dispatch(getUsers({ search }));
        }, 1000);

        return () => clearTimeout(debounce);
    }, [search, dispatch]);

    const handleChatSelection = (user) => {
        if (user?._id) dispatch(setActiveChat(user));
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    return (
        <Sidebar>
            <SidebarContent className="scrollbar-hidden">
                <SidebarGroup>
                    <SidebarGroupLabel>Chats</SidebarGroupLabel>
                    <SearchBox loading={loading} setSearch={setSearch} />
                    <SidebarMenu>
                        {loading ? (
                            <motion.div>
                                <UserListSkeleton rows={6} />
                            </motion.div>
                        ) : (
                            <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }}>
                                {userList.map((user) => (
                                    <motion.div key={user._id} variants={itemVariants}>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className="flex items-center px-4 py-6 my-1 focus:bg-slate-200" onClick={() => handleChatSelection(user)}>
                                                <img src={user.pic || "/default-avatar.png"} alt={user.fullName} className="rounded-full h-10 w-10 bg-slate-200 p-1" />
                                                <span className="ml-2">{user.fullName}</span>
                                            </SidebarMenuButton>
                                            <SidebarSeparator />
                                        </SidebarMenuItem>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
