import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const UserListSkeleton = ({ rows }) => {
    return (
        <>
            {[...new Array(rows)].map((_, i) => (
                <motion.div
                    key={i}
                    className="mb-1 flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px] ml-2" />
                    </div>
                </motion.div>
            ))}
        </>
    );
};

export default UserListSkeleton;
