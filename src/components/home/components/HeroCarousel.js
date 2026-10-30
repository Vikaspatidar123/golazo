import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../style.module.scss";

const slides = [
  {
    id: 801,
    bgImg: "/assets/images/hero/header_801.jpg",
    logoImg: "/assets/images/hero/header_logo_pts_801.png",
    url: "/crazzy_win",
    alt: "Spinomenal Con Spinomenal 10.000 USDT",
  },
  {
    id: 800,
    bgImg: "/assets/images/hero/header_800.jpg",
    logoImg: "/assets/images/hero/header_logo_pts_800.png",
    url: "/casino?system=505",
    alt: "Halloween Free Spin 2.500 Free Spins",
  },
  {
    id: 3,
    bgImg: "/assets/images/hero/header_001.jpg",
    logoImg: "/assets/images/hero/header_logo_game.png",
    url: "/casino",
    alt: "Juegos Destacados Golazo",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);


  return (
    <section
      id="header-lobby"
      className={styles.heroCarousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slideItem} ${
            index === currentSlide ? styles.activeSlide : ""
          }`}
        >
          <Link href={slide.url} className={styles.slideLinkWrapper}>
            <img
              src={slide.bgImg}
              alt="Hero Background"
              className={styles.slideBackground}
            />
            <div className={styles.slideOverlayMask}>
              <img
                src={slide.logoImg}
                alt={slide.alt}
                className={styles.slideLogo}
              />
            </div>
          </Link>
        </div>
      ))}



      {/* Indicators */}
      <div className={styles.carouselIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.indicatorDot} ${
              index === currentSlide ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
