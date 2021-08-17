import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/HomePage.module.css';

const functions = [];
function renderLoop() {
  functions.forEach(fn => fn());
  requestAnimationFrame(renderLoop);
}
if (typeof window !== "undefined") requestAnimationFrame(renderLoop);

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a>
          <img src="/logo.svg" className={styles.navbar__logo} />
        </a>
      </Link>
      <ul className={styles.navbar__container}>
        <li className={styles.navbar__item}>
          <Link href="/projects" >
            <a className={styles.navbar__link}>Projects</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/about" >
            <a className={styles.navbar__link}>About Me</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/contact" >
            <a className={styles.navbar__link}>Contact Me</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <a className={styles.navbar__link} href="https://blog.firecraftgaming.com">Blog</a>
        </li>
      </ul>
    </nav>
  );
};

const Page: React.FC<{ scroller: React.MutableRefObject<HTMLDivElement>, location: number, cover: number }> = ({ scroller, location, cover, children }) => {
  const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
  const element = useRef<HTMLDivElement>();
  
  useEffect(() => {
    if (!element.current) return;
    
    const fn = () => {
      if (!element.current) return;
      if (!scroller.current) return;
      
      const elem = scroller.current.parentElement;
      const progress = elem.scrollTop / elem.getBoundingClientRect().height;
      
      const a = progress - (location + cover - 1);
      const b = location - progress;
      
      const v = clamp(a) + clamp(b);
      
      element.current.style.setProperty('--gprogress', progress.toString());
      element.current.style.setProperty('--progress', v.toString());
    };
    
    element.current.style.setProperty('--location', location.toString());
    element.current.style.setProperty('--cover', cover.toString());
    
    functions.push(fn);
    return () => {
      functions.splice(functions.indexOf(fn), 1);
    };
  }, [element]);
  
  return (
    <div ref={element} className={styles.page} >
      {children}
    </div>
  );
};

const Pages = () => {
  const scroller = useRef<HTMLDivElement>();

  useEffect(() => {
    const elem = scroller.current?.parentElement;
    if (!elem) return;

    elem.addEventListener('wheel', (event) => {
      event.preventDefault();
      elem.scroll(0, elem.scrollTop + event.deltaY);
    });
  }, [scroller]);

  return (
    <div className={styles.pages__wrapper}>
      <div className={styles.pages} ref={scroller}>
        <Page scroller={scroller} location={0} cover={2}>
          <div className={styles.page__title}>{
  `I am Eliyah Sundström
  14 year old developer`
          }</div>
        </Page>
        <Page scroller={scroller} location={2} cover={2}>
          <div className={styles.page__title}>
            See which{' '}
            <Link href="/projects">
              <a href="/projects">projects</a>
            </Link>
            <br />
            I am currently working on
          </div>
        </Page>
        <Page scroller={scroller} location={4} cover={2}>
          <div className={styles.page__title}>
            Contact me on discord
            <br />
            <a target="_blank" href="https://discord.com/channels/@me/firecraftgaming#3210">firecraftgaming#3210</a>
          </div>
        </Page>
        <Page scroller={scroller} location={6} cover={2}>
          <div className={styles.page__title}>
            Contact me using mail
            <br />
            <a href="mailto:eliyah@sundstroem.com">eliyah@sundstroem.com</a>
            <br />
            <a href="mailto:mail@firecraftgaming.com">mail@firecraftgaming.com</a>
          </div>
        </Page>
      </div>
    </div>
  );
};

const HomePage = (props) => {
  return (
    <div className={styles.homepage}>
      <Navbar />
      <Pages />
    </div>
  );
}

export default HomePage;