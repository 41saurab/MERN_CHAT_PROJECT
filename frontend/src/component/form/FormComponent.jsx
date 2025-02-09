import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useController } from "react-hook-form";

export const FormLabelComponent = ({ htmlFor, label }) => (
    <Label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
    </Label>
);

export const FormInputComponent = ({ type = "text", name, placeholder = "Enter valid data", control, errorMsg = null }) => {
    const { field } = useController({
        control: control,
        name: name,
    });
    return (
        <div className="relative pb-5">
            <Input
                type={type}
                id={name}
                placeholder={placeholder}
                {...field}
                className={`w-full bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border transition-colors rounded-md 
                    ${
                        errorMsg
                            ? "border-red-500 focus-visible:ring-red-500 dark:border-red-400 dark:focus-visible:ring-red-500"
                            : "border-slate-300 focus:ring-primary dark:border-slate-600 dark:focus:ring-primary"
                    }`}
            />
            {errorMsg && <span className="absolute bottom-0 left-0 text-xs text-red-600 dark:text-red-400">{errorMsg}</span>}
        </div>
    );
};

export const FormImageComponent = ({ setPic, thumb = null, name = "image", errorMsg = null }) => {
    return (
        <div className="relative pb-5">
            <Input
                type="file"
                name={name}
                id={name}
                onChange={(e) => {
                    setPic(e.target.files[0]);
                }}
                className={`w-full file:bg-slate-50 file:text-slate-800 hover:file:bg-slate-100 dark:file:bg-slate-800 dark:file:text-slate-100 dark:file:hover:bg-slate-700 border rounded-md 
                    ${
                        errorMsg
                            ? "border-red-500 focus-visible:ring-red-500 dark:border-red-400 dark:focus-visible:ring-red-500"
                            : "border-slate-300 dark:border-slate-600 focus:ring-primary"
                    }`}
            />
            {errorMsg && <span className="absolute bottom-0 left-0 text-xs text-red-600 dark:text-red-400">{errorMsg}</span>}
            {thumb ? (
                <div>
                    <img
                        src={typeof thumb === "string" ? thumb : URL.createObjectURL(thumb)}
                        alt=""
                        className={` ${
                            errorMsg
                                ? "border-red-500 focus-visible:ring-red-500 dark:border-red-400 dark:focus-visible:ring-red-500"
                                : "border-slate-300 dark:border-slate-600 focus:ring-primary"
                        }`}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
