import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNavigation from "./components/BottomNavigation";
import PWARegister from "./components/PWARegister";
import { CartProvider } from "./context/CartContext";
const geistSans=Geist({variable:"--font-geist-sans",subsets:["latin"]});
const geistMono=Geist_Mono({variable:"--font-geist-mono",subsets:["latin"]});
export const metadata:Metadata={title:"Popular Hambúrgueria e Sorveteria",description:"Aplicativo oficial da Popular Hambúrgueria e Sorveteria",applicationName:"Popular",manifest:"/manifest.webmanifest",icons:{icon:"/logo.png",apple:"/logo.png"},appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"Popular"},formatDetection:{telephone:true}};
export const viewport:Viewport={themeColor:"#facc15",width:"device-width",initialScale:1,viewportFit:"cover"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full bg-zinc-950 text-white"><PWARegister/><CartProvider>{children}<BottomNavigation/></CartProvider></body></html>}
