import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { motion } from "framer-motion";

export const LoadingBtnComponent = () => {
    return (
        <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Button disabled className="w-full transition-colors disabled:cursor-not-allowed disabled:opacity-50">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
        </motion.div>
    );
};

export const SubmitButtonComponent = ({ label, disabled = false }) => {
    return (
        <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            <Button disabled={disabled} className="w-full transition-colors hover:bg-[#c92b4d] focus:outline-none">
                {label}
            </Button>
        </motion.div>
    );
};
