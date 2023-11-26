"use client";

import axios from "axios";
import { useState } from "react";
import AllBrokenLinks from "./components/AllBrokenLinks";
import Loader from "./components/Loader";

export default function Home() {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);

  const isLinkValid = (): boolean => {
    const pattern: RegExp = /^(ftp|http(s)?):\/\/[^ "]+$/;

    return pattern.test(inputUrl);
  }
  
  const checkLinks = async () => {
    setLoading(true);
    if (isLinkValid()) {
      const res = await axios.post('/api/check-links', {
        url: inputUrl
      })
        .then((response) => {
          setBrokenLinks(response.data.brokenLinks);
        })
        .catch((error) => {
          if(error.response) {
            if(error.response.status == 400) alert(error.response.data.error);
            if(error.response.status == 500) alert(JSON.stringify(error.response.data));
          }
        });
    } else {
      if(inputUrl.length > 0) alert("Please enter an valid URL");
      else alert("Please enter an valid URL")
    }
    setLoading(false);
  }
  const handleSubmit = () => {
    checkLinks();
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Broken Link Checker</h1>
      <p className="mb-4 italic underline">Please provide a full URL with protocols (http, https, ftp, etc) and prefix (www, etc)</p>
      <label>Enter URL:</label>
      <input 
        type="text" 
        id="urlInput" 
        onChange={e => setInputUrl(e.target.value)} 
        placeholder="http://www.example.com/" 
        className="border-2 rounded-md mx-2 focus:none"
      />
      <button className="text-white rounded-md bg-neutral-700 hover:bg-neutral-800 w-32" onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader /> : "Check Links"}
      </button>
      <hr></hr>
      <div id="results"><AllBrokenLinks brokenLinks={brokenLinks}/></div>
    </div>
  )
}
