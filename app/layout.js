import Header from "@/components/Header";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
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
