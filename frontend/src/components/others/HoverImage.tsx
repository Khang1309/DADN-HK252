import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export const HoverImage = ({ src }: { src: any }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    // INVERSION HAPPENS HERE: 
    // As mouse moves from 0 to 400, the image moves from 25 to -25
    const moveX = useTransform(mouseX, [0, 400], [25, -25]);
    const moveY = useTransform(mouseY, [0, 400], [25, -25]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }

    function handleMouseLeave() {
        x.set(200); // Reset to center (half of your range)
        y.set(200);
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="font-(--font-geist)  min-h-screen flex items-center bg-cover bg-bottom justify-center p-4  from-slate-900 to-slate-900"
        >
            <motion.img
                src={src}
                style={{ x: moveX, y: moveY }}
                className="w-[120%] h-[120%] object-cover" // Scale up slightly so edges don't show when moving
            />
        </div>
    );
};