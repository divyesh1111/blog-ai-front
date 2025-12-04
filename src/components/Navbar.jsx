import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaBloggerB } from "react-icons/fa6";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="shadow-md fixed w-full top-0 left-0 z-50 bg-gray-900">
            <div className="max-w-6xl mx-auto flex gap-7 items-center p-1.5">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 object-cover pl-3 text-5xl flex items-center text-green-500">
                        <FaBloggerB />
                    </div>
                    <span className='text-white font-bold text-xl'>BlinkBlog</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 items-center ">
                    <Link to="/" className="text-white hover:text-green-500 font-medium">Home</Link>
                </nav>

                {/* Mobile Menu Icon on the right */}
                <div className="ml-auto md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? (
                            <FiX className="text-2xl text-white" />
                        ) : (
                            <FiMenu className="text-2xl text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Right Side Mobile Drawer Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-40 md:hidden`}
            >
                <div className="p-4 border-b flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2" onClick={toggleMenu}>
                        <div className="w-10 h-10 object-cover pl-1 text-4xl flex items-center text-green-500">
                            <FaBloggerB />
                        </div>
                    </Link>
                    <FiX className="text-2xl text-gray-800" onClick={toggleMenu} />
                </div>

                <nav className="flex flex-col p-4 gap-4">
                    <Link to="/" onClick={toggleMenu} className="text-gray-700 hover:text-green-500 font-medium">Home</Link>
                </nav>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
                    onClick={toggleMenu}
                ></div>
            )}
        </header>
    );
}
