import "./Link.scss";
import React from "react";

export type LinkProps = React.PropsWithChildren<{

}> & React.LinkHTMLAttributes<HTMLLinkElement>;

const Link: React.FC<LinkProps> = ({ children, className, href = "#" }) => {
    return (
        <a href={href} className={className}>
            {children}
        </a>
    );
};
export default Link;