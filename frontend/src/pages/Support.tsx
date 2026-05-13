import React from 'react'
import { motion } from 'framer-motion'
import { MapPinned, Phone, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

import myLogo from '../assets/images/logo.svg'
import FAQHeader from '../assets/images/faqheader.png'

function MyMap() {
    return (
        <div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0926371280025!2d106.80281137581046!3d10.880558489274618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a5568c997f%3A0xdeac05f17a166e0c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJBIUUcgVFAuSENN!5e0!3m2!1svi!2s!4v1777732084687!5m2!1svi!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}

function Support() {



    return (
        <>
            <div className='flex flex-col mb-10'>

                <div className='flex flex-col items-center justify-center bg-cover min-h-45 bg-no-repeat font-bold text-6xl text-white' style={{ backgroundImage: `url(${FAQHeader})` }} >
                    Frequenly Asked Questions
                </div>
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="shipping"
                    className="max-w-[100%] md:max-w-[70%] lg:max-w-[50%] mx-auto mt-2"
                >
                    <AccordionItem value="setup">
                        <AccordionTrigger>How do I pair a new smart device with the app?</AccordionTrigger>
                        <AccordionContent>
                            Ensure your device is plugged in and in pairing mode (usually indicated by a blinking light). Open the app, tap the '+' icon on the dashboard, and follow the on-screen instructions to link it to your home Wi-Fi.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="network">
                        <AccordionTrigger>Does my device require a 2.4GHz Wi-Fi network?</AccordionTrigger>
                        <AccordionContent>
                            Yes, most of our smart devices require a 2.4GHz network for the initial setup, as it offers a longer range through walls. Once paired, your phone can be on any network (5GHz or cellular) to control the device.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="remote-access">
                        <AccordionTrigger>Can I control my devices when I'm away from home?</AccordionTrigger>
                        <AccordionContent>
                            Absolutely. As long as your smart devices remain connected to your home Wi-Fi and your phone has an active internet connection, you can monitor and control your home from anywhere in the world.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="security">
                        <AccordionTrigger>How secure is my data and device connection?</AccordionTrigger>
                        <AccordionContent>
                            We take your privacy seriously. All data transmitted between your app, our cloud servers, and your devices is secured using end-to-end AES-256 encryption. We never share or sell your personal usage data.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="offline">
                        <AccordionTrigger>What happens to my automations if the internet goes down?</AccordionTrigger>
                        <AccordionContent>
                            If your home internet drops, you won't be able to control devices remotely via the app. However, any pre-set schedules or local automations (like daily timers) will continue to run normally on the hardware itself.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="">
                <MyMap />
                {/* Page header */}

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className='rounded-none  font-(--font-geist) bg-(--primary-foreground) px-6 py-4 '>
                        <div className='flex flex-col md:flex-row justify-center items-center'>

                            <img className='w-80 flex-2' src={myLogo} alt="" />

                            <div className=' flex-3'>

                                <CardTitle className='text-3xl'>CONTACT WITH US</CardTitle>
                                <CardContent className='p-0 flex flex-col gap-4'>
                                    <div className='text-xl'>If you need support, please contact us in following channels</div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='inline-flex gap-2  px-2 py-1  rounded-2xl hover:bg-[rgba(0,0,0,0.1)]'>
                                            <MapPinned />
                                            <div>289 Ly Thuong Kiet street, Dien Hong Ward, HCMC</div>
                                        </div>
                                        <a href={'tel:+84901234567'} className='inline-flex gap-2  px-2 py-1 rounded-2xl hover:bg-[rgba(0,0,0,0.1)]'>
                                            <Phone />
                                            <div>+84 12345 67891</div>
                                        </a>
                                        <a href={'mailto:contact@smarthome.com'} className='inline-flex gap-2 px-2 py-1 rounded-2xl hover:bg-[rgba(0,0,0,0.1)]'>
                                            <Mail />
                                            <div>contact@smarthome.com</div>
                                        </a>
                                    </div>
                                </CardContent>
                            </div>
                        </div>
                        <div className='mt-2 pt-4  text-center text-xs text-gray-500'>
                            © {new Date().getFullYear()} Smart Home. All rights reserved.
                        </div>
                    </Card>

                </motion.div>




            </div>


        </>
    )
}

export default Support