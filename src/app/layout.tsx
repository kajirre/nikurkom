import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-serif",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Archivo Digital del Pueblo Pijao",
    template: "%s | Archivo Digital Pijao"
  },
  description: "Plataforma de autoridad sobre el territorio, memoria histórica, saberes y actualidad del pueblo Pijao en el Tolima, Colombia.",
  keywords: ["Pijao", "Indígenas Colombia", "Tolima", "Territorio", "Memoria Histórica", "Resguardos Indígenas", "Cultura Pijao"],
  authors: [{ name: "Comunidad Pijao" }],
  creator: "Archivo Digital Pijao",
  publisher: "Archivo Digital Pijao",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Archivo Digital del Pueblo Pijao",
    description: "Plataforma de autoridad sobre el territorio, cultura y memoria del pueblo Pijao.",
    url: "https://archivopijao.org", // URL base ficticia por ahora
    siteName: "Archivo Digital Pijao",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archivo Digital del Pueblo Pijao",
    description: "Plataforma de autoridad sobre el territorio, cultura y memoria del pueblo Pijao.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${merriweather.variable} font-sans bg-white text-stone-900 antialiased`}>
        <Navigation />
        <main className="min-h-screen animate-slide-up">
          {children}
        </main>
        <footer className="border-t border-stone-100 py-12 mt-20 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 text-stone-500 text-sm">
            <p>© {new Date().getFullYear()} Archivo Digital Pijao - Autonomía y Memoria Territorial</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
