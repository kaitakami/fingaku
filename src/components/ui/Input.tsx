import React, { type HTMLProps } from "react"

const Input: React.FC<HTMLProps<HTMLInputElement>> = ({ ...props }) => (
    <input
        {...props}
        className={`${props.className || ""
            } w-full px-3 py-2 text-zinc-500 outline-none border border-gray-800 shadow-sm rounded-lg duration-150`}
    />
);

export default Input;
