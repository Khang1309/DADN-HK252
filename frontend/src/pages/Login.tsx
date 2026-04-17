import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { type EmblaOptionsType } from 'embla-carousel'
import { Checkbox, Description, Field, Label } from '@headlessui/react';

import EmblaCarousel from '../components/carousel/EmblaCarousel';
import '../components/carousel/embla.css'

import s from './Login.module.css'
import { theme } from '../utils/theme'
import { useUserInfoStore } from '../store/useUserStore'


const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Login() {

    const navigate = useNavigate()
    const [formDataRegister, SetFormDataRegister] = useState({
        name: '',
        email: '',
        password: '',
        repassword: '',
        agree: false,
    }
    )

    const [formDataLogin, SetFormDataLogin] = useState({
        email: '',
        password: '',
    }
    )


    const [isLogin, setIsLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const error = useUserInfoStore(s => s.err)
    const setError = useUserInfoStore(s => s.setError)


    const handleChangeLogin = (e: any) => {
        const { name, value } = e.target;

        SetFormDataLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleChangeRegister = (e: any) => {
        const { name, value } = e.target;

        SetFormDataRegister(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        SetFormDataRegister(prevState => ({
            ...prevState,
            agree: checked
        }));
    };


    const login = useUserInfoStore(s => s.login)
    const handleSubmitLogin = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            console.log(formDataLogin)
            await login(formDataLogin.email, formDataLogin.password)

            // Check if login was successful before navigating
            const { err, info } = useUserInfoStore.getState()
            if (!err && info?.token) {
                await navigate('/dashboard')
            }
        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false)
        }

    };


    const register = useUserInfoStore(s => s.register)
    const handleSubmitRegister = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (formDataRegister.password !== formDataRegister.repassword) {
            setError("Password do not match! Please try again!")
            return;
        }

        if (!formDataRegister.agree) {
            setError("You need to agree to out terms and conditions!")
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await register(formDataRegister.email, formDataRegister.password, formDataRegister.name)


            if (!error) {
                setError(error);
            } else {
                await navigate('/dashboard');
            }
        } catch (error) {
            console.error("System error during registration:", error);
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }

    };


    return <div className={s.parent}>
        <div className={s.container} style={{ background: theme.loginTheme.containBlockBackground }} >
            <AnimatePresence>
                {
                    isLogin ?
                        <>
                            <motion.div
                                key="login"
                                className="flex w-full flex-row-reverse"
                                initial={{ opacity: 0, x: 20 }} // Start faded out and slightly to the left
                                animate={{ opacity: 1, x: 0 }}   // Animate to normal position
                                exit={{ opacity: 0, x: 50 }}     // Fade out and slide right when destroyed
                                transition={{ duration: 0.3 }}
                            >
                                <div className={s.slider}>
                                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                                </div>
                                <div className={s.content}>
                                    <div className={s.title}>Login to your account</div>
                                    <div className={s.subtitle}>Don't have an account? <span onClick={() => { setIsLogin(false), setError(null) }}>Register</span></div>
                                    <form onSubmit={handleSubmitLogin} method='POST'>
                                        <div>
                                            <input type="text" name='email' placeholder="Your registered email" onChange={handleChangeLogin} />
                                        </div>

                                        <div>
                                            <input type="password" name='password' placeholder="Your password" onChange={handleChangeLogin} />
                                        </div>

                                        <button type="submit" style={{ background: theme.loginTheme.buttonCreate }} className='flex justify-center items-center'>
                                            {isLoading ? (
                                                <svg className="animate-spin h-5 w-5 m-auto text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : "Log in"}
                                        </button>
                                    </form>
                                    {
                                        error && <div className='bg-red-500 text-white rounded-xl p-2'>{error}</div>
                                    }
                                </div>
                            </motion.div></>
                        :
                        <>

                            <motion.div
                                key="register"
                                className="flex w-full"
                                initial={{ opacity: 0, x: 20 }}  // Start faded out and slightly to the right
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={s.slider}>
                                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                                </div>
                                <div className={s.content}>
                                    <div className={s.title}>Create an account</div>
                                    <div className={s.subtitle}>Already have an account? <span onClick={() => { setIsLogin(true), setError(null) }}>Log in</span></div>
                                    <form onSubmit={handleSubmitRegister} method='POST'>
                                        <div className={s.name}>
                                            <input type="text" name="name" placeholder="Your full name" onChange={handleChangeRegister} required />
                                        </div>

                                        <div>
                                            <input type="email" name='email' placeholder="Your email" onChange={handleChangeRegister} required />
                                        </div>

                                        <div>
                                            <input type="password" name='password' placeholder="Your password" onChange={handleChangeRegister} required />
                                        </div>

                                        <div>
                                            <input type="password" name='repassword' placeholder="Re-enter your password to confirm" onChange={handleChangeRegister} required />
                                        </div>


                                        <Field className="flex relative items-center gap-2">
                                            <Checkbox
                                                checked={formDataRegister.agree}
                                                onChange={handleCheckboxChange}
                                                className="group block size-4 rounded border bg-white data-checked:bg-blue-500 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-checked:data-disabled:bg-gray-500"
                                            >
                                                <svg className="stroke-white opacity-0 group-data-checked:opacity-100 transition-all duration-0.3s ease-in-out;" viewBox="0 0 14 14" fill="none">
                                                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Checkbox>
                                            <Label>Agree to terms and conditions</Label>

                                        </Field>
                                        <button type="submit" style={{ background: theme.loginTheme.buttonCreate }} className='flex justify-center items-center'>
                                            {isLoading ? (
                                                <svg className="animate-spin h-6 w-6 m-auto text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : "Create account"}
                                        </button>
                                    </form>
                                    {
                                        error && <div className='bg-red-500 text-white rounded-xl p-2'>{error}</div>
                                    }
                                </div>
                            </motion.div></>
                }
            </AnimatePresence>


        </div>
    </div>
}
