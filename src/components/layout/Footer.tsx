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