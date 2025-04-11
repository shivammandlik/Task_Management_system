import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 px-4 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div>
                    <p className="text-lg font-semibold">© {new Date().getFullYear()}</p>
                    <p className="text-sm">ID: 210041218 | Secure Task Management System (TMS)</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <p className="text-sm">Made with ❤️ using React</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
