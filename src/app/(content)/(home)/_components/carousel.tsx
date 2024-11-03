"use client";

import useEmblaCarousel from "embla-carousel-react";
import { PropsWithChildren } from "react";

export default function Carousel({ children }: PropsWithChildren) {
    const [emblaRef] = useEmblaCarousel();
    return (
        <div ref={emblaRef} className="overflow-hidden w-full cursor-grab">
            <div className="flex">
                {children}
            </div>
        </div>
    );
}
