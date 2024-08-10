import React, { useState } from 'react'
import { FloatingShape } from '../components/FloatingShape'
import { motion } from "framer-motion"
import Input from '../components/Input';
import { CiMail } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { forgotPassword } from '../redux/api';
import { Loader } from '../components/Loader';


export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email, setLoading, setIsSubmitted);

    };
    return (
        <div
            className='min-h-screen bg-gradient-to-br
from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
        >
            <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
            <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
            <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                        Forgot Password
                    </h2>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p className='text-gray-300 mb-6 text-center'>
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <Input
                                icon={<CiMail className='size-5 text-green-500' />}
                                type='email'
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none  transition duration-200'
                                type='submit'
                            >
                                {loading ? <Loader text={"Sending..."} style={"flex items-center justify-center gap-4"} /> : "Send Reset Link"}
                            </motion.button>
                        </form>
                    ) : (
                        <div className='text-center'>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
                            >
                                <CiMail className='size-6 text-black' />
                            </motion.div>
                            <p className='text-gray-300 mb-6'>
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                        </div>
                    )}
                </div>

                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <Link to={"/signin"} className='text-sm text-green-400 hover:underline flex items-center'>
                        <FaArrowLeftLong className='h-4 w-4 mr-2' /> Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
