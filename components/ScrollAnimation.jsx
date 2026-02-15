"use client";
import { useEffect, useRef, useState } from "react";
export default function ScrollAnimation({ children, className = "", delay = 0 }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => observer.disconnect();
    }, []);
    return (<div ref={ref} className={`transition-all duration-700 ease-out transform ${isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>);
}
