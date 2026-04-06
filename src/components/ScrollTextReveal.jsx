import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollTextReveal = ({
  text = "I build digital experiences that push boundaries — blending creativity with code to craft interfaces that feel alive, responsive, and unforgettable.",
}) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = wordsRef.current;
    if (!words.length) return;

    // Set initial state
    gsap.set(words, { opacity: 0.08 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalWords = words.length;

          words.forEach((word, index) => {
            if (!word) return;
            const wordProgress = index / totalWords;
            const nextWordProgress = (index + 1) / totalWords;

            let opacity = 0.08;

            if (progress >= nextWordProgress) {
              opacity = 1;
            } else if (progress >= wordProgress) {
              const fadeProgress =
                (progress - wordProgress) / (nextWordProgress - wordProgress);
              opacity = 0.08 + fadeProgress * 0.92;
            }

            gsap.to(word, {
              opacity,
              duration: 0.1,
              overwrite: true,
            });
          });
        },
      });
    });

    return () => ctx.revert();
  }, [text]);

  const wordElements = text.split(' ');

  return (
    <section
      style={{
        padding: 'clamp(6rem, 14vh, 10rem) 1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle glow backdrop */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vh',
          background:
            'radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={containerRef}
        style={{
          maxWidth: 900,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Decorative line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background:
                'linear-gradient(to right, transparent, rgba(124,58,237,0.5))',
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              color: '#7c3aed',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            My Philosophy
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              background:
                'linear-gradient(to left, transparent, rgba(124,58,237,0.5))',
            }}
          />
        </div>

        {/* The animated text */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
            fontWeight: 300,
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            color: '#f0eeff',
            margin: 0,
          }}
        >
          {wordElements.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              style={{
                display: 'inline-block',
                marginRight: '0.35em',
                transition: 'color 0.3s ease',
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Bottom decorative element */}
        <div
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background:
                  i === 1
                    ? '#7c3aed'
                    : 'rgba(124,58,237,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollTextReveal;
