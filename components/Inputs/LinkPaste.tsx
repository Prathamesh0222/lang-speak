import React, { ChangeEventHandler } from "react";
import { IconLink } from "@tabler/icons-react";

export const LinkPaste = (handleLinkPaste: ChangeEventHandler<HTMLInputElement>) => {
    return <label htmlFor="link-input" className="course-pointer">
        <IconLink size={21} />
        <input type="text"
            id="link-input"
            className="hidden"
            onChange={handleLinkPaste}
        >
        </input>
    </label>
}