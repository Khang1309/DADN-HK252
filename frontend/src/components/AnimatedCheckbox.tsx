import { motion } from "framer-motion";

export const AnimatedCheckbox = ({ checked, onChange, id }) => {
    return (
        <div
            id={id}
            onClick={() => onChange(!checked)}
            className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border transition-colors duration-200 ${checked
                    ? "bg-purple-600 border-purple-600" // Active state colors
                    : "bg-transparent border-slate-400 hover:border-slate-300" // Inactive state colors
                }`}
            role="checkbox"
            aria-checked={checked}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(!checked);
                }
            }}
        >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3.5" // Thicker stroke looks better for checks
                stroke="white"
                className="h-3.5 w-3.5"
                initial={false}
                animate={checked ? "checked" : "unchecked"}
            >
                <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    variants={{
                        checked: {
                            pathLength: 1,
                            opacity: 1,
                            transition: { duration: 0.3, ease: "easeOut" }
                        },
                        unchecked: {
                            pathLength: 0,
                            opacity: 0,
                            transition: { duration: 0.2, ease: "easeIn" }
                        }
                    }}
                />
            </motion.svg>
        </div>
    );
};