import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/chats");
        }
    }, [navigate]);

    return (
        <div className="relative bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={cn("absolute bg-white/10 rounded-full", i % 2 === 0 ? "w-8 h-8" : "w-12 h-12")}
                        initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0,
                        }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            scale: [0, 1.2, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 text-red-600 pb-5">ChatSphere</h1>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">A space to chat with users.</p>
                    <Button onClick={() => navigate("/chats")} className="text-lg px-8 py-6 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all hover:scale-105">
                        Start Chatting Now
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
