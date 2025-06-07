import type { Metadata } from "next";
// Am înlocuit Poppins cu Playfair_Display
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter'
});

// Configurăm noul font pentru titluri
const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ['400', '700', '800'],
    display: 'swap',
    variable: '--font-playfair'
});

export const metadata: Metadata = {
    title: "Platforma de Rețete",
    description: "Găsește rețeta perfectă pentru tine!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    // Aplicăm ambele variabile de font
    return (
        <html lang="en">
        <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
        </html>
    );
}