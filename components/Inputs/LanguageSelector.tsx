import React from "react";
import { IconLanguage } from "@tabler/icons-react";

type LanguageSelectorProps = {
    selectedLanguage: string;
    setSelectedLanguage: (languageCode: string) => void;
    languages: { code: string, name: string }[];
}

export const LanguageSelector = ({ selectedLanguage, setSelectedLanguage, languages }: LanguageSelectorProps) => {
    return <div>
        <span className="cursor-pointer rounded-full space-x-1 pl-2 bg-black flex items-center flex-row">
            <IconLanguage size={20} />
            <select
                value={selectedLanguage}
                onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                }}
                className="bg-black flex flex-row rounded-full py-1 text-white"
            >
                {languages.map((language) => {
                    return <option key={language.code} value={language.code}>{language.name}</option>
                })}
            </select>
        </span>
    </div>
}