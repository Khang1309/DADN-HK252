import { useState, useLayoutEffect, useRef } from 'react'

export const useHeight = () => {
    const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
    const ref = useRef<HTMLLabelElement>(null);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        // The observer triggers every time the element's size changes
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                // borderBoxSize accounts for padding and borders
                // contentRect is just the inner content
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });

        observer.observe(element);

        // Cleanup: Stop observing when the component is destroyed
        return () => observer.disconnect();
    }, []);

    return [ref, dimensions.height, dimensions.width] as const;
};