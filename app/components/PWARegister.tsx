"use client";
import {useEffect} from "react";
export default function PWARegister(){useEffect(()=>{if("serviceWorker" in navigator){navigator.serviceWorker.register("/sw.js",{scope:"/"}).catch(err=>console.error("Service Worker:",err));}},[]);return null;}