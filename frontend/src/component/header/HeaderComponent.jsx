import React from "react";

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { AvatarImage } from "@radix-ui/react-avatar";

import { motion } from "framer-motion";

const HeaderComponent = ({ user, handleLogout }) => {
    const NameInitials = ({ name }) => {
        if (!name) return "Profile";

        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("");
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="bg-slate-100 flex w-full justify-between items-center py-1">
            <SidebarTrigger />
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Avatar className="ring-2 ring-slate-300">
                            <AvatarImage
                                src={user?.pic}
                                onError={(e) => {
                                    e.target.src = "https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_hybrid";
                                }}
                                alt={user?.pic}
                            />
                            <AvatarFallback>
                                <NameInitials name={user?.fullName} />
                            </AvatarFallback>
                        </Avatar>
                    </MenubarTrigger>
                    <MenubarContent className="w-20">
                        <AlertDialog>
                            <AlertDialogTrigger className="relative flex  select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent cursor-pointer w-full">
                                Profile
                            </AlertDialogTrigger>
                            <AlertDialogContent className="text-center">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-center">Your profile</AlertDialogTitle>
                                    <img className="max-h-80 object-contain items-center" src={user?.pic} alt={user?.fullName} />
                                </AlertDialogHeader>
                                <AlertDialogDescription>Name: {user?.fullName}</AlertDialogDescription>
                                <AlertDialogDescription>Email: {user?.email}</AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-[#e11d48] hover:bg-[#c92b4d]  text-white hover:text-white">Cancel</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <MenubarSeparator />
                        <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </motion.div>
    );
};

export default HeaderComponent;
