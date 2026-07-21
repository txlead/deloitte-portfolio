import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import sphere1 from '/sphere-1.png';
import sphere2 from '/sphere-2.png';
import sphere3 from '/sphere-3.png';
import sphere4 from '/sphere-4.png';
import sphere5 from '/sphere-5.png';

const TOPIC_SPHERES = [
  { src: sphere1, size: 200, angleOffset: 0, delay: 0.1 },
  { src: sphere2, size: 165, angleOffset: 72, delay: 0.4 },
  { src: sphere3, size: 190, angleOffset: 144, delay: 0.7 },
  { src: sphere4, size: 220, angleOffset: 216, delay: 1.0 },
  { src: sphere5, size: 205, angleOffset: 288, delay: 1.3 },
];

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
const SPHERE_SCALE = isMobile ? 0.5 : 1;
const ORBIT_RADIUS_X = isMobile ? 200 : 560;
const ORBIT_RADIUS_Y = isMobile ? 155 : 320;
const ORBIT_DURATION = 26;

function TopicSphere({
  src, size: rawSize, angleOffset, delay,
}: typeof TOPIC_SPHERES[number]) {
  const size = Math.round(rawSize * SPHERE_SCALE);
  const half = size / 2;
  const x = useMotionValue(Math.cos((angleOffset * Math.PI) / 180) * ORBIT_RADIUS_X - half);
  const y = useMotionValue(Math.sin((angleOffset * Math.PI) / 180) * ORBIT_RADIUS_Y - half);
  const startTime = useRef<number | null>(null);

  useAnimationFrame((t) => {
    if (startTime.current === null) startTime.current = t;
    const localT = t - startTime.current - delay * 1000;
    if (localT < 0) return;
    const angle = angleOffset + (localT / (ORBIT_DURATION * 1000)) * 360;
    const rad = (angle * Math.PI) / 180;
    x.set(Math.cos(rad) * ORBIT_RADIUS_X - half);
    y.set(Math.sin(rad) * ORBIT_RADIUS_Y - half);
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        x,
        y,
        zIndex: 0,
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 10px 24px rgba(60,100,180,0.2))',
        }}
        draggable={false}
      />
    </motion.div>
  );
}

const LETTERS = 'Lens ai'.split('');

export default function Hero() {
  return (
    <section
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        fontFamily: "'Satoshi', 'Inter Tight', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 1100,
          height: 1100,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(96,165,250,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Topic spheres flying in around the wordmark */}
      {TOPIC_SPHERES.map((s, i) => (
        <TopicSphere key={i} {...s} />
      ))}

      <div style={{ display: 'flex', alignItems: 'center', gap: 22, position: 'relative', zIndex: 1 }}>
        {/* Letter-by-letter reveal */}
        <h1
          style={{
            fontSize: 'clamp(96px, 14vw, 200px)',
            fontWeight: 500,
            letterSpacing: '-6.5px',
            color: '#05050C',
            margin: 0,
            display: 'flex',
          }}
        >
          {LETTERS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 36, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
        style={{
          fontSize: 18,
          fontWeight: 400,
          color: 'rgba(5,5,12,0.45)',
          marginTop: 28,
          letterSpacing: '-0.1px',
        }}
      >
        News that knows what matters to you.
      </motion.p>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={{ position: 'absolute', bottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 28, background: 'rgba(5,5,12,0.2)' }}
        />
      </motion.div>
    </section>
  );
}
