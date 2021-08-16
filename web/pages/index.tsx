import { useEffect, useRef, useState } from 'react';
import styles from '../styles/HomePage.module.css';

const functions = [];
function renderLoop() {
  functions.forEach(fn => fn());
  requestAnimationFrame(renderLoop);
}
if (typeof window !== "undefined") requestAnimationFrame(renderLoop);

const Page: React.FC<{ progress: number, location: number, cover: number }> = ({ progress, location, cover, children }) => {
  const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

  const a = progress - (location + cover - 1);
  const b = location - progress;

  const v = clamp(a) + clamp(b);
  
  return (
    <div className={styles.page} style={{
      '--gprogress': progress,
      '--progress': v,
      '--location': location,
      '--cover': cover,
    } as any} >
      {children}
    </div>
  );
};

const HomePage = (props) => {
  const scroller = useRef<HTMLDivElement>();
  const [progress, setProgress] = useState(0);

  

  useEffect(() => {
    const fn = () => {
      const elem = scroller.current.parentElement;
      const progress = elem.scrollTop / elem.getBoundingClientRect().height;
      setProgress(progress);
    };

    functions.push(fn);
    return () => {
      functions.splice(functions.indexOf(fn), 1);
    };
  }, []);

  return (
    <div className={styles.pages} ref={scroller}>
      <Page progress={progress} location={0} cover={2}>
        <div className={styles.page__title}>Hello World</div>
        <div className={styles.page__testbg} />
      </Page>
      <Page progress={progress} location={2} cover={1}>
        <div className={styles.page__title}>I am Eliyah Sundström</div>
      </Page>
      <Page progress={progress} location={3} cover={1}>
        <div className={styles.page__title}>14 Year Old Developer</div>
      </Page>
    </div>
  );
}

export default HomePage;