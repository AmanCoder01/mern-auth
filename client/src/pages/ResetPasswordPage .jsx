import React, { useState } from 'react'
import { FloatingShape } from '../components/FloatingShape'
import Input from '../components/Input';
import { RiLockPasswordLine } from "react-icons/ri";
import { motion } from "framer-motion"
import toast from 'react-hot-toast';
import { resetPassword } from '../redux/api';
import { useNavigate, useParams } from "react-router-dom";


export const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { token } = useParams();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        await resetPassword(token, password, navigate, setLoading);

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
                        Reset Password
                    </h2>
                    {/* {error && <p className='text-red-500 text-sm mb-4'>{error}</p>} */}
                    {/* {message && <p className='text-green-500 text-sm mb-4'>{message}</p>} */}

                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={<RiLockPasswordLine className='size-5 text-green-500 opacity-65' />}
                            type='password'
                            placeholder='New Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Input
                            icon={<RiLockPasswordLine className='size-5 text-green-500 opacity-65' />}
                            type='password'
                            placeholder='Confirm New Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none  transition duration-200'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Set New Password"}
                        </motion.button>
                    </form>
                </div>

            </motion.div>
        </div>
    )
}
