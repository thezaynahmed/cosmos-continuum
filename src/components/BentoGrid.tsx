import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[20rem]",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoItem = ({
    className,
    children,
    colSpan = 1,
    rowSpan = 1,
}: {
    className?: string;
    children: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento transition duration-200 shadow-input dark:shadow-none p-4 bg-black/20 border-white/10 justify-between flex flex-col space-y-4",
                colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
                rowSpan === 2 ? "md:row-span-2" : "md:row-span-1",
                className
            )}
        >
            {children}
        </div>
    );
};
