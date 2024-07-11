import React from "react";

import {
    IconBriefcase,
    IconBulb,
    IconSchool,
    IconWriting,
    IconMoodSmile,
    IconHeart,
} from "@tabler/icons-react";

const categories = [
    { icon: IconBriefcase, name: "Business" },
    { icon: IconBulb, name: "Technology" },
    { icon: IconWriting, name: "Writing" },
    { icon: IconMoodSmile, name: "Lifestyle" },
    { icon: IconHeart, name: "Health" },
    { icon: IconSchool, name: "Education" }
];

export const CategoryLinks = () => {
    return <div className="mt-10 sm:mt-20">
        {categories.map(({icon:Icon,name:label})=>{
            return <div key={label} className="m-1 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200
           shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 text-white">
                <Icon size={20} />
                <span>{label}</span>
            </div>
        })}
    </div>
}

