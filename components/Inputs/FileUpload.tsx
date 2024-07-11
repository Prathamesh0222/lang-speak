import React from "react";
import { IconPaperclip } from "@tabler/icons-react";

type FileUploadProps = {
    handleFileUpload: (event: React.MouseEvent<HTMLInputElement>)=> void;
}

export const FileUpload = ({handleFileUpload}:FileUploadProps) => {
    return <label htmlFor="file-upload" className="cursor-pointer">
        <IconPaperclip size={22} />
        <input id="file-upload" type="file" onClick={handleFileUpload} className="hidden">
        </input>
    </label>
}