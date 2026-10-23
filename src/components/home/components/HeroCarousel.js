import React, { useState, useEffect } from "react";
import styles from "../style.module.scss";

const slides = [
  {
    id: 1,
    bgImg: "/assets/images/hero/header.jpg",
    logoImg: "/assets/images/hero/header_logo_pts.png",
    url: "/crazzy_win",
    alt: "Copa Red Rake Gaming 10.000 USDT",
  },
  {
    id: 2,
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
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

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
        </div>
      ))}

      {/* Prev / Next Arrows */}
      <button
        type="button"
        className={`${styles.carouselArrow} ${styles.arrowPrev}`}
        onClick={handlePrev}
        aria-label="Slide anterior"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <button
        type="button"
        className={`${styles.carouselArrow} ${styles.arrowNext}`}
        onClick={handleNext}
        aria-label="Siguiente slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

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
