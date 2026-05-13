import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { Wifi, Shield, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserInfoStore } from '@/store/useUserStore'
import { AnimatedCheckbox } from '@/components/AnimatedCheckbox'


import bgImg from '../assets/images/loginBg.svg';
import loginImg from '../assets/images/loginImgsvg.svg'
import welcomImg from '../assets/images/welcome.svg'

export default function Login() {
  const navigate = useNavigate()

  const [formDataRegister, setFormDataRegister] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
    agree: false,
  })

  const [formDataLogin, setFormDataLogin] = useState({
    email: '',
    password: '',
  })

  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const error = useUserInfoStore((s) => s.err)
  const setError = useUserInfoStore((s) => s.setError)

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormDataLogin((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormDataRegister((prev) => ({ ...prev, [name]: value }))
  }

  const login = useUserInfoStore((s) => s.login)
  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(formDataLogin.email, formDataLogin.password)
      const { err, info } = useUserInfoStore.getState()
      if (!err && info?.token) {
        await navigate('/dashboard')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const register = useUserInfoStore((s) => s.register)
  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formDataRegister.password !== formDataRegister.repassword) {
      setError('Passwords do not match! Please try again.')
      return
    }

    if (!formDataRegister.agree) {
      setError('You need to agree to our terms and conditions!')
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      await register(formDataRegister.email, formDataRegister.password, formDataRegister.name)
      const { err, info } = useUserInfoStore.getState()
      if (!err && info?.token) {
        await navigate('/dashboard')
      }
    } catch {
      setError('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    { icon: Wifi, title: 'Connected', desc: 'MQTT real-time control' },
    { icon: Shield, title: 'Secure', desc: 'End-to-end protection' },
    { icon: Zap, title: 'Fast', desc: 'Instant device response' },
  ]

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the movement
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  // "Opposite" movement: mouse moves right (positive), bg moves left (negative)
  // We use a small range like -30 to 30 so it's subtle and professional
  const bgX = useTransform(smoothX, [0, 1920], [30, -30]);
  const bgY = useTransform(smoothY, [0, 1080], [30, -30]);

  const handleMouseMove = (e: any) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <div
      className="font-(--font-geist) min-h-screen flex items-center justify-center p-4 from-slate-900 to-slate-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Static Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{
          backgroundImage: `url("${bgImg}")`,
          x: bgX,
          y: bgY,
          scale: 1.1
        }}
      />

      {/* Form Container - Static */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10  rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        <div className="flex z-10 min-h-150">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                className="flex w-full flex-row-reverse"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hero side */}
                <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-6"
                  >
                    <div className="mx-auto bg-no-repeat bg-center bg-contain w-64 h-64"
                      style={{
                        backgroundImage: `url("${loginImg}")`
                      }}
                    >
                    </div>

                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="text-white/60 max-w-sm">
                      Control your smart home devices from anywhere. Monitor sensors and automate your space.
                    </p>
                    {/* <div className="flex gap-6 justify-center pt-4">
                      {features.map((f, i) => (
                        <motion.div
                          key={f.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="text-center"
                        >
                          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 mb-2">
                            <f.icon className="h-5 w-5 text-white/80" />
                          </div>
                          <p className="text-xs text-white/60">{f.title}</p>
                        </motion.div>
                      ))}
                    </div> */}
                  </motion.div>
                </div>

                {/* Form side */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6 max-w-sm mx-auto w-full">
                    <div>
                      <h1 className="text-2xl font-bold text-white">Log in to your account</h1>
                      <p className="text-sm text-white/50 mt-1">
                        Don't have an account?{' '}
                        <button
                          onClick={() => { setIsLogin(false); setError(null) }}
                          className="text-primary hover:underline cursor-pointer"
                        >
                          Register
                        </button>
                      </p>
                    </div>

                    <form onSubmit={handleSubmitLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-white/70">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          onChange={handleChangeLogin}
                          className="bg-white/10 hover:border-blue-500 border-white/10 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-white/70">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          onChange={handleChangeLogin}
                          className="bg-white/10 hover:border-blue-500 border-white/10 text-white placeholder:text-white/30"

                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading || !formDataLogin.email || !formDataLogin.password}>
                        {isLoading ? (
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : 'Log in'}
                      </Button>
                    </form>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-destructive/20 border border-destructive/30 p-3 text-sm text-destructive"
                      >
                        {error}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                className="flex w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hero side */}
                <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-6"
                  >
                    <div className="mx-auto bg-no-repeat bg-center bg-contain h-64 w-64"
                      style={{
                        backgroundImage: `url("${welcomImg}")`
                      }}
                    >
                    </div>
                    <h2 className="text-3xl font-bold text-white">Get Started</h2>
                    <p className="text-white/60 max-w-sm">
                      Create your account and start managing your smart home devices today.
                    </p>
                    {/* <div className="flex gap-6 justify-center pt-4">
                      {features.map((f, i) => (
                        <motion.div
                          key={f.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="text-center"
                        >
                          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 mb-2">
                            <f.icon className="h-5 w-5 text-white/80" />
                          </div>
                          <p className="text-xs text-white/60">{f.title}</p>
                        </motion.div>
                      ))}
                    </div> */}
                  </motion.div>
                </div>

                {/* Form side */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6 max-w-sm mx-auto w-full">
                    <div>
                      <h1 className="text-2xl font-bold text-white">Create an account</h1>
                      <p className="text-sm text-white/50 mt-1">
                        Already have an account?{' '}
                        <button
                          onClick={() => { setIsLogin(true); setError(null) }}
                          className="text-primary hover:underline cursor-pointer"
                        >
                          Log in
                        </button>
                      </p>
                    </div>

                    <form onSubmit={handleSubmitRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reg-name" className="text-white/70">Full Name</Label>
                        <Input
                          id="reg-name"
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          onChange={handleChangeRegister}
                          required
                          className="bg-white/10 hover:border-blue-500 border-white/10 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-email" className="text-white/70">Email</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          onChange={handleChangeRegister}
                          required
                          className="bg-white/10 hover:border-blue-500 border-white/10 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-password" className="text-white/70">Password</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          name="password"
                          placeholder="Create a password"
                          onChange={handleChangeRegister}
                          required
                          className="bg-white/10 hover:border-blue-500 border-white/10 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-repassword" className="text-white/70">Confirm Password</Label>
                        <Input
                          id="reg-repassword"
                          type="password"
                          name="repassword"
                          placeholder="Re-enter your password"
                          onChange={handleChangeRegister}
                          required
                          className="bg-white/10 hover:border-blue-500 border-white/10 text-white placeholder:text-white/30"
                          aria-invalid={formDataRegister.password != formDataRegister.repassword}
                        />
                        {formDataRegister.password != formDataRegister.repassword ? (
                          <p className="text-red-500 text-sm">Password doesn't match!</p>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2">
                        <AnimatedCheckbox
                          id="terms"
                          checked={formDataRegister.agree}
                          onChange={(isChecked: any) =>
                            setFormDataRegister((prev) => ({ ...prev, agree: isChecked }))
                          }
                        />
                        <Label htmlFor="terms" className="text-sm text-white/60 cursor-pointer">
                          I agree to the terms and conditions
                        </Label>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading || !formDataRegister.name
                        || !formDataRegister.email || !formDataRegister.password || !formDataRegister.repassword || !formDataRegister.agree}>
                        {isLoading ? (
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : 'Create account'}
                      </Button>
                    </form>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-destructive/20 border border-destructive/30 p-3 text-sm text-destructive"
                      >
                        {error}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
