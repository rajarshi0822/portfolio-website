import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxElements = () => {
  const containerRef = useRef(null);
  const leftTwigRef = useRef(null);
  const rightTwigRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Left twig moving up by -2000
      if (leftTwigRef.current) {
        gsap.to(leftTwigRef.current, {
          y: -2000,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-wrapper',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Right twig moving up by -3500
      if (rightTwigRef.current) {
        gsap.to(rightTwigRef.current, {
          y: -3500,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-wrapper',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2, // Twigs sit above hero bg but under text
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <img
        ref={leftTwigRef}
        src="/mask-1.webp"
        alt=""
        style={{
          position: 'absolute',
          width: '700px',
          bottom: '20%',
          left: 0,
          zIndex: 5,
        }}
      />
      <img
        ref={rightTwigRef}
        src="/mask-2.webp"
        alt=""
        style={{
          position: 'absolute',
          width: '800px',
          bottom: '10%',
          right: 0,
          zIndex: 5,
        }}
      />
    </div>
  );
};

export default ParallaxElements;
