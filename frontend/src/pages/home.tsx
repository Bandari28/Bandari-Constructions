import { useEffect, useRef } from "react";
import Properties from "./properties/propertyList";
import type { Property } from "./properties/properties";
interface PropertyManagementProps {
    properties: Property[];
    setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
}
export default function Home({
    properties,
    setProperties,
}: PropertyManagementProps) {
    // Animation for left bubble
    const leftBubbleRef = useRef<HTMLDivElement>(null);
    // Animation for right bubble
    const rightBubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let leftDir = 1, rightDir = -1;
        let leftPos = 0, rightPos = 0;
        const animate = () => {
            if (leftBubbleRef.current) {
                leftPos += leftDir * 0.7;
                if (leftPos > 40 || leftPos < -40) leftDir *= -1;
                leftBubbleRef.current.style.transform = `translateY(${leftPos}px)`;
            }
            if (rightBubbleRef.current) {
                rightPos += rightDir * 0.7;
                if (rightPos < -40 || rightPos > 40) rightDir *= -1;
                rightBubbleRef.current.style.transform = `translateY(${rightPos}px)`;
            }
            requestAnimationFrame(animate);
        };
        animate();
        return () => { };




    }, []);



    return (


        <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-400 to-blue-800 relative overflow-hidden">
            {/* Background decorative circles */}
            {/* Left moving bubble */}
            <div
                ref={leftBubbleRef}
                className="absolute left-3 sm:left-5 top-1/5 -translate-y-1 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-purple-200 opacity-80 rounded-full border border-white shadow-2xl"
                style={{ animation: "none" }}
            />
            {/* Right moving bubble */}
            <div
                ref={rightBubbleRef}
                className="absolute right-3 sm:right-10 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-purple-400 opacity-80 rounded-full border border-white shadow-2xl"
                style={{ animation: "none" }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24">
                {/* Main heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center mb-6 sm:mb-8 leading-tight">
                    Find Your Dream Home
                </h1>
                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center mb-8 sm:mb-10 md:mb-12 max-w-3xl leading-relaxed font-light">
                    Discover exceptional luxury properties in the most prestigious neighborhoods. Your perfect home awaits.
                </p>
                <Properties properties={properties} setProperties={setProperties} />
            </div>
        </div>

    );
}