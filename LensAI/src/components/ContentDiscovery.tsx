import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import screen2 from '/screen-2.png';
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

const PARAGRAPHS = [
  {
    label: '',
    text: <>Standard pattern for topic discovery is a list or grid of category tags — scannable, predictable, low cognitive load.<br />I deliberately moved away from that.</>,
  },
  {
    label: 'Why:',
    text: <> our core problem isn't "users can't find categories" — it's signal overload. A list of 20 text categories recreates the overload problem in miniature. I wanted discovery to feel like drifting through a small, curated set of living things, not scanning a menu.</>,
  },
  {
    label: 'Tradeoff I accepted:',
    text: <> orbs are slower to scan than a text list, and less accessible at a glance.<br />I'm trading scan-speed for a sense of "this is curated, not a database."</>,
  },
  {
    label: 'Biggest risk:',
    text: ' discoverability. Will first-time users understand orbs are tappable, and will they find specific topics fast if they have one in mind?',
  },
];

export default function ContentDiscovery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <section
      ref={ref}
      style={{
        width: '100%',
        background: '#fbfcfe',
        fontFamily: "'Inter Tight', sans-serif",
        boxSizing: 'border-box',
        padding: '64px 80px 64px',
      }}
    >
      <div style={{ maxWidth: 1100 }}>
        <motion.h2
          initial={{ opacity: 0, x: -32, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            fontWeight: 600,
            letterSpacing: '-1.5px',
            color: '#05050C',
            margin: '0 0 44px',
          }}
        >
          Content Discovery
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: 'easeOut' }}
              style={{
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'rgba(5,5,12,0.7)',
                margin: 0,
              }}
            >
              {p.label && <strong style={{ fontWeight: 600, color: '#05050C' }}>{p.label}</strong>}
              {p.text}
            </motion.p>
          ))}
        </div>

        <motion.img
          src={screen2}
          alt="Content discovery mock"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            maxWidth: isMobile ? 160 : 220,
            height: 'auto',
            display: 'block',
            marginTop: 56,
            borderRadius: 16,
            boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
          }}
          draggable={false}
        />
      </div>
    </section>
  );
}
