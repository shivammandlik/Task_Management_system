import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <main className='min-h-screen bg-gradient-to-b from-cyan-300 via-cyan-100 to-white flex items-center justify-center px-4 py-10'>
                <div className='bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full border border-cyan-200'>

                    <h1 className='text-center font-bold text-4xl text-cyan-700 mb-6'>
                        Welcome to the Secure Task Management System
                    </h1>

                    <p className='text-center text-cyan-900 text-lg md:text-xl leading-relaxed mb-10'>
                    "Sign up to securely manage your personal tasks. You can create, update, and delete tasks as needed.
                     Admins have access to view all users and their associated tasks."
                    </p>

                    {/* Buttons inside a styled container */}
                    <div className='bg-cyan-50 p-6 rounded-xl shadow-inner border border-cyan-200'>
                        <h2 className='text-2xl text-center font-semibold text-cyan-800 mb-6'>Get Started</h2>
                        <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
                            <Link to="/login"
                                className='w-full md:w-auto text-center py-3 px-6 text-lg border border-cyan-400 rounded bg-cyan-600 text-white font-semibold hover:bg-cyan-800 hover:border-cyan-700 shadow-md hover:shadow-lg transition'>
                                Log In
                            </Link>
                            <Link to="/register"
                                className='w-full md:w-auto text-center py-3 px-6 text-lg border border-cyan-400 rounded bg-cyan-600 text-white font-semibold hover:bg-cyan-800 hover:border-cyan-700 shadow-md hover:shadow-lg transition'>
                                Register
                            </Link>
                            <Link to="/admin"
                                className='w-full md:w-auto text-center py-3 px-6 text-lg border border-cyan-400 rounded bg-cyan-600 text-white font-semibold hover:bg-cyan-800 hover:border-cyan-700 shadow-md hover:shadow-lg transition'>
                                Admin Login
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;
