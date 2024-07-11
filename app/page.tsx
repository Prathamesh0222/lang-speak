"use client"
import { TextArea } from "@/components/Inputs/TextArea";
import "regenerator-runtime/runtime";
import { ChangeEvent, useState } from "react";
import { SpeechRecognitionComponent } from "@/components/SpeechRecognition/SpeechRecognition";
import { IconCopy, IconStar, IconThumbDown, IconThumbUp, IconVolume } from "@tabler/icons-react";
import { rtfToText } from "@/utils/rtfToText";
import { FileUpload } from "@/components/Inputs/FileUpload";
import useTranslate from "@/hooks/useTranslate";
import { LinkPaste } from "@/components/Inputs/LinkPaste";

import { LanguageSelector } from "@/components/Inputs/LanguageSelector";
import { SvgDecorations } from "@/components/SvgDecorations";
import { CategoryLinks } from "@/components/CategoryLinks";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied,setCopied] = useState<boolean>(false);
  const [favorite,setFavorite] = useState<boolean>(false);
  const [languages] = useState([
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ja', name: 'Japanese' },
      {code: 'hi', name: 'Hindi'},
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Japanese");
  const targetText = useTranslate(sourceText, selectedLanguage)

  const handleAudioPlayback = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  const handleFileUpload = (event:React.MouseEvent<HTMLInputElement>)=>{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
    }
       reader.readAsText(file);
      };
    }

    const handleCopyToClipboard = () => {
      navigator.clipboard.writeText(targetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const handleLike = () => {
      console.log("Liked");
    };

    const handleDislike = () => {
      console.log("Disliked");
    };

    const handleLinkPaste = async(e:ChangeEvent<HTMLInputElement>)=>{
      const link = e.target.value;
      try{
        const response = await fetch(link);
        const data = await response.text();
        setSourceText(data); 
      }catch(e){
        console.error("Error while fetching the link",e);
      }

    }

    const handleFavorite = () => {
      setFavorite(!favorite);
      if (!favorite) {
        localStorage.setItem("favoriteTranslation", targetText);
      } else {
        localStorage.removeItem("favoriteTranslation");
      }
    };

  return (
    <div>
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="relative overflow-hidden h-screen">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">Lang 
                <span className="text-[#f87315]">Speak</span>
                </h1>
                <p className="mt-3 text-neutral-400">
                  LangSpeak: Linking Voices, Uniting Worlds
                </p>
                <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
                  <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                      <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                          <TextArea
                          id="source-language"
                          placeholder="Enter text to translate"
                          value={sourceText}
                          onChange={(e)=>{
                            setSourceText(e.target.value);
                          }}
                          />
                          <div className="flex flex-row justify-between w-full">
                              <span className="cursor-pointer flex space-x-2 flex-row">
                                <SpeechRecognitionComponent setSourceText={setSourceText}/>
                                <IconVolume size={22} onClick={()=>{handleAudioPlayback(sourceText)}} className="text-gray-400"/>
                                  <FileUpload handleFileUpload={handleFileUpload}/>
                                  <LinkPaste handleLinkPaste={handleLinkPaste}/>
                              </span>
                              <span className="text-sm pr-4">
                                {sourceText.length} / 2000
                              </span>
                          </div>
                      </div>
                      <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                      <TextArea id={"target-language"}
                      value={targetText}
                      onChange={()=>{}}
                      placeholder={"Target Language"}/>
                      <div className="flex flex-row justify-between w-full">
                        <span className="cursor-pointer flex space-x-2 flex-row items-center">
                              <LanguageSelector 
                              selectedLanguage={selectedLanguage}
                              setSelectedLanguage={setSelectedLanguage}
                              languages={languages}
                              />
                              <IconVolume size={22} onClick={()=>{handleAudioPlayback(targetText)}} className="text-gray-400"/>    
                        </span>
                        <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                      <IconCopy size={22} onClick={handleCopyToClipboard} />
                      {copied && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                      <IconThumbUp size={22} onClick={handleLike} />
                      <IconThumbDown size={22} onClick={handleDislike} />
                      <IconStar
                        size={22}
                        onClick={handleFavorite}
                        className={favorite ? "text-yellow-500" : ""}
                      />
                      </div>
                      </div>
                  </div>
                </div>
                <SvgDecorations/>
            </div>
            <CategoryLinks/>
          </div>
          </div>
      </div>
    </div>
    </div>
  );
}
