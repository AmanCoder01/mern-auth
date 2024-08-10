import React, { useState } from 'react'
import { FloatingShape } from '../components/FloatingShape'
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { motion } from "framer-motion"
import { signin } from '../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';

export const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector(state => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        await signin({ email, password }, dispatch, navigate);
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
                        Welcome Back
                    </h2>

                    <form onSubmit={handleLogin}>
                        <Input
                            icon={<CiMail className='size-5 text-green-500' />}
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={<RiLockPasswordLine className='size-5 text-green-500 opacity-65' />}
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className='flex items-center mb-6'>
                            <Link to='/forgot-password' className='text-sm text-green-400 hover:underline '>
                                Forgot password?
                            </Link>
                        </div>
                        {/* {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>} */}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none  transition duration-200'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? <Loader text={"Signing..."} style={"flex items-center justify-center gap-4"} /> : "Sign In"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Don't have an account?{" "}
                        <Link to='/signup' className='text-green-400 hover:underline'>
                            Sign up
                        </Link>
                    </p>
                </div>

            </motion.div>

        </div>
    )
}
