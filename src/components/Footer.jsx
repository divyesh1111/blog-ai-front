import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaBloggerB } from 'react-icons/fa6';
import { MdWork } from "react-icons/md";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-3 px-2">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">

                {/* Logo */}
                <div className="flex items-center gap-1">
                    <FaBloggerB className="text-green-400 text-xl" />
                    <span className="font-semibold text-sm">BlinkBlog</span>
                </div>

                {/* Copyright */}
                <div className="text-gray-400 text-[11px] text-center">
                    © {currentYear} BlinkBlog. All rights reserved by <span className='text-green-500'>9111</span>.
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                    <a href="https://github.com/divyesh1111" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
                        <FaGithub className="text-lg" />
                    </a>
                    <a href="https://www.linkedin.com/in/divyesh001" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
                        <FaLinkedin className="text-lg" />
                    </a>
                    <a href="https://divyeshh.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
                        <MdWork className="text-lg" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
