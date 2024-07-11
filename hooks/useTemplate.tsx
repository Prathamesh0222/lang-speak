import { useEffect, useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

export const useTranslate = (sourceText:string, selectedLanguage:string) => {
    const [targetText, setTargetText] = useState("");

    useEffect(()=>{
        const handleTranslate = async(sourceText:string)=>{
            try{
                const response = await openai.chat.completions.create({
                    model:'gpt-4o',
                    messages:[{role:'user',content:
                        `
                        You will be provided with a sentence. This sentence is ${sourceText}.
                        Your task is to:
                        - Detect what language the sentence is in
                        - Translate the sentence into ${selectedLanguage}
                        do not return anything other than the translated sentence
                        `
                    }]        
                })
                const data = response.choices[0].message.content || "";
                setTargetText(data);
            }catch(err){
                console.error('Error in translation: ',err);
            }
        }
        if(sourceText.trim()){
            const timeoutId = setTimeout(()=>{
                handleTranslate(sourceText)
            },500)
            return () => clearTimeout(timeoutId);
        }
    },[sourceText,selectedLanguage])
    return targetText;
}

