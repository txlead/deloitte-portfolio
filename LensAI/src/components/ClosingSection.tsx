import { motion } from 'framer-motion';
import closingSphere from '/closing-sphere.png';

const WORDS = "Let's build something the world hasn't seen yet.".split(' ');

export default function ClosingSection() {
  return (
    <section
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#fbfcfe',
        fontFamily: "'Inter Tight', sans-serif",
        boxSizing: 'border-box',
        padding: '40px 80px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '130%',
          maxWidth: 1800,
          pointerEvents: 'none',
        }}
      >
        <img
          src={closingSphere}
          alt=""
          style={{ width: '100%', display: 'block' }}
          draggable={false}
        />
      </div>

      <h2
        style={{
          fontSize: 'clamp(28px, 6vw, 80px)',
          fontWeight: 500,
          letterSpacing: '-2px',
          lineHeight: 1.15,
          color: '#05050C',
          margin: 0,
          maxWidth: 1100,
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {WORDS.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block', marginRight: '0.28em' }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1, marginTop: '48px', textAlign: 'center' }}
      >
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 'clamp(14px, 1.5vw, 18px)', color: '#888', marginBottom: '24px', letterSpacing: '-0.01em' }}>
          Keep exploring.
        </p>
        <a
          href="../../Innorehab_case/case_innorehab.html"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 'clamp(16px, 2vw, 22px)',
            fontWeight: 500,
            color: '#05050C',
            border: '1.5px solid #05050C',
            borderRadius: '100px',
            padding: 'clamp(14px, 2vw, 22px) clamp(28px, 4vw, 56px)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            position: 'relative',
            overflow: 'hidden',
            transition: 'color 0.4s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
            ((e.currentTarget as HTMLAnchorElement).querySelector('.next-fill') as HTMLElement).style.transform = 'translateX(0)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = '#05050C';
            ((e.currentTarget as HTMLAnchorElement).querySelector('.next-fill') as HTMLElement).style.transform = 'translateX(-100%)';
          }}
        >
          <span className="next-fill" style={{ position: 'absolute', inset: 0, background: '#05050C', transform: 'translateX(-100%)', transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)', zIndex: 0 }} />
          <span style={{ position: 'relative', zIndex: 1 }}>Next</span>
          <span style={{ position: 'relative', zIndex: 1, fontSize: '1.1em' }}>→</span>
        </a>
      </motion.div>
    </section>
  );
}
