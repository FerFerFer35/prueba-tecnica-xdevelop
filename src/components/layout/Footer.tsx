/**
 * Componente de pie de página (Footer)
 * 
 * Renderiza el pie de página de la aplicación con información de derechos de autor
 * y enlaces de navegación (Privacidad, Términos y Contacto).
 * 
 * El componente es responsive:
 * - En dispositivos móviles: los elementos se apilan verticalmente
 * - En dispositivos medianos y superiores: se distribuyen horizontalmente
 * 
 * @component
 * @returns {JSX.Element} Elemento footer con copyright y enlaces de navegación
 * 
 * @example
 * // Uso básico del componente
 * <Footer />
 * 
 * @remarks
 * - Utiliza Tailwind CSS para estilos y responsividad
 * - El año del copyright se genera dinámicamente con `new Date().getFullYear()`
 * - Los enlaces actualmente no tienen destino funcional (href="#")
 * - El componente utiliza flexbox para la alineación y distribución del contenido
 */

export default function Footer() {
    return (
        <footer className="w-full border-t bg-white mt-10">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">

                {/* Left */}
                <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>

                {/* Right */}
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-black transition">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-black transition">
                        Terms
                    </a>
                    <a href="#" className="hover:text-black transition">
                        Contact
                    </a>
                </div>

            </div>
        </footer>
    )
}