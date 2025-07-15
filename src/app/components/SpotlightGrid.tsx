import Image from "next/image";
import { useEffect, useRef } from "react";

const SpotlightGrid = ({
  partners,
}: {
  partners: { src: string; alt: string }[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    let frameId: number;
    let scrollPos = 0;
    const scrollSpeed = 0.5;

    const animateScroll = () => {
      if (!scrollContainer) return;
      scrollPos += scrollSpeed;
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0;
      }
      scrollContainer.scrollLeft = scrollPos;
      frameId = requestAnimationFrame(animateScroll);
    };

    frameId = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full py-4 relative no-scrollbar"
    >
      <div className="relative w-full">
        {/* Fade effect on left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Fade effect on right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex space-x-10 w-max" style={{ whiteSpace: "nowrap" }}>
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="w-[140px] h-[80px] relative flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                fill
                className="object-contain grayscale hover:grayscale-0 hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default SpotlightGrid;
