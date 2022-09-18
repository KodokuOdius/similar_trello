import React from "react";
import "./Button.scss";

export type ButtonType = React.PropsWithChildren<{

}> & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonType> = ({ children, className, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};
export default Button;