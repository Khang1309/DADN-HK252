import React, { Children } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'


interface RealButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const RealButton = ({ children, ...props }: RealButtonProps) => {
    return (
        <motion.button
            whileTap={{
                y: 4,
                borderBottomWidth: 0,
                boxShadow: "0px 0px 0px rgba(0,0,0,0)"
            }}
            transition={{ duration: 0.1 }}
            className="shadow-lg"
        >

            <Button {...props}>{children}</Button>
        </motion.button>
    )
}

export default RealButton