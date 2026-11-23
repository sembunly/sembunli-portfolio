import { useEffect, useState } from 'react';
import splashImage from '../assets/splash-screen.jpg';
import './SplashScreen.css';

const EXIT_DURATION = 850;
const LOGO_DURATION = 650;
const WORD = 'SEM BUNLY';
const LOADING_DURATION = 2300;

export default function SplashScreen({ onFinish }) {
  const [stage, setStage] = useState('logo');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const timeouts = [];
    const schedule = (callback, delay) => timeouts.push(window.setTimeout(callback, delay));

    if (reducedMotion && stage !== 'exit') {
      schedule(() => setStage('exit'), 0);
    } else if (reducedMotion) {
      schedule(onFinish, 0);
    } else if (stage === 'logo') {
      schedule(() => setStage('name'), LOGO_DURATION);
    } else if (stage === 'name') {
      schedule(() => {
        setStage('exit');
      }, LOADING_DURATION - LOGO_DURATION);
    } else if (stage === 'exit') {
      schedule(onFinish, EXIT_DURATION);
    }

    return () => {
      timeouts.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onFinish, reducedMotion, stage]);

  return (
    <section
      className={`splash-screen splash-screen--${stage}`}
      aria-label="Loading Sem Bunly portfolio"
      aria-live="polite"
    >
      <div className="splash-screen__grain" aria-hidden="true" />
      <div className="splash-screen__orb splash-screen__orb--one" aria-hidden="true" />
      <div className="splash-screen__orb splash-screen__orb--two" aria-hidden="true" />
      <div className={`splash-screen__content splash-screen__content--${stage}`}>
        <div className="splash-screen__image-frame" aria-hidden="true">
          <img className="splash-screen__image" src={splashImage} alt="" />
        </div>
        <p className="splash-screen__wordmark" aria-label="Sem Bunly">
          {WORD.split('').map((letter, index) => (
            <span
              className={index < 3 ? 'splash-screen__letter--white' : 'splash-screen__letter--mint'}
              key={`${letter}-${index}`}
              style={{ '--letter-delay': `${index * 90}ms` }}
            >
              {letter}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
