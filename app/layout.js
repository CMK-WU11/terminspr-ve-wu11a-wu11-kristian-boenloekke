import Header from "@/components/Header";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthProvider";
import { headers } from "next/headers";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

//få pathname server-side via headers sat i middleware.js - Løsning fundet her. https://www.propelauth.com/post/getting-url-in-next-server-components

export default async function RootLayout({ children }) {
  // const headerList = await headers()
  // const pathname = headerList.get('x-current-path')
  // const showHeader = pathname !== '/'

  return (
    <html lang="en">
      <body>
        <AuthProvider>
         <Header /> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
