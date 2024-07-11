import React from "react";

type IconButtonProps = {
    Icon: any;
    onClick: () => void;
}

export const IconButton = ({ Icon, onClick }: IconButtonProps) => {
    return <div>
        <span className="cursor-pointer flex items-center space-x-2"
            onClick={onClick}>
            <Icon size={22} />
        </span>
    </div>
}