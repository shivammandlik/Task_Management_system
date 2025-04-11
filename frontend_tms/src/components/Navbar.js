import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Make sure to install lucide-react

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem('token');
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in');

    const handleLogout = () => {
        if (isAdminLoggedIn) {
            localStorage.removeItem('admin_logged_in');
            navigate('/admin');
        } else {
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-cyan-700 shadow-md text-white font-medium">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-xl md:text-2xl font-extrabold tracking-wide"
                >
                    Task Management System
                </Link>

                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                <div className="hidden md:flex space-x-4 items-center">
                    {(token || isAdminLoggedIn) ? (
                        <button
                            onClick={handleLogout}
                            className="py-2 px-4 rounded bg-white text-cyan-800 font-bold hover:bg-cyan-800 hover:text-white border border-white transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="py-2 px-4 rounded bg-white text-cyan-800 font-bold hover:bg-cyan-800 hover:text-white border border-white transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="py-2 px-4 rounded bg-white text-cyan-800 font-bold hover:bg-cyan-800 hover:text-white border border-white transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-cyan-600 px-4 pb-4 space-y-2">
                    {(token || isAdminLoggedIn) ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setMenuOpen(false);
                            }}
                            className="block w-full text-left py-2 px-4 rounded bg-white text-cyan-800 font-bold hover:bg-cyan-800 hover:text-white border border-white transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="block w-full text-left py-2 px-4 rounded bg-white text-cyan-800 font-bold hover:bg-cyan-800 hover:text-white border border-white transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="block w-full text-left py-2 px-4 rounded bg-white text-cyan-800 font-bold hover:bg-cyan-800 hover:text-white border border-white transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
