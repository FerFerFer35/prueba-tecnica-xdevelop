import { QueryProvider } from "@/providers/query-provider";
import React from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Componente raíz de la aplicación que proporciona la estructura principal del layout.
 * 
 * @component
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido hijo que será renderizado dentro del layout principal
 * @returns {React.ReactElement} Elemento HTML raíz con estructura de página completa incluyendo encabezado, contenido principal y pie de página
 * 
 * @description
 * Este es el componente de layout raíz de Next.js que envuelve toda la aplicación.
 * Incluye:
 * - Etiqueta HTML con idioma en español
 * - Componente Header en la parte superior
 * - Área main con altura mínima de pantalla completa
 * - QueryProvider para gestionar estado y queries
 * - Componente Footer en la parte inferior
 */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="min-h-screen">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Footer />
      </body>
    </html>
  )
}