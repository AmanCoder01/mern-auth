import React, { useState } from 'react'
import { FloatingShape } from '../components/FloatingShape'
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { LuUser } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useDispatch } from 'react-redux'
import { signup } from '../redux/api'
import { useSelector } from "react-redux";
import { Loader } from '../components/Loader'


export const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await signup({ email, password, name }, dispatch, navigate);
        } catch (error) {
            console.log(error);
        }
    }

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
                        Create Account
                    </h2>

                    <form onSubmit={handleSignUp}>
                        <Input
                            icon={<LuUser className='size-5 text-green-500 opacity-65' />}
                            type='text'
                            placeholder='Full Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        {/* {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>} */}
                        <PasswordStrengthMeter password={password} />

                        <motion.button
                            className='mt-4 w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none  transition duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? <Loader text={"Signup..."} style={"flex items-center justify-center gap-4"} /> : "Sign Up"}

                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Already have an account?{" "}
                        <Link to={"/signin"} className='text-green-400 hover:underline'>
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
