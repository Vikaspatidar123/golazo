import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "../style.module.scss";

const redRakeGames = [
  { id: 1, name: "Joker Fiesta", image: "/assets/images/rrg/vivo-jokerfiesta.jpg" },
  { id: 2, name: "Dragon Fortunes", image: "/assets/images/rrg/rrg-slot-dragonfortunes.jpg" },
  { id: 3, name: "Medusa Hunt", image: "/assets/images/rrg/vivo-medusahunt.jpg" },
  { id: 4, name: "Egypt", image: "/assets/images/rrg/vivo-egypt.jpg" },
  { id: 5, name: "Super Coins", image: "/assets/images/rrg/vivo-supercoins.jpg" },
  { id: 6, name: "Super 5 Stars", image: "/assets/images/rrg/rrg-slot-super5stars.jpg" },
  { id: 7, name: "Tumbling Diamonds", image: "/assets/images/rrg/rrg-slot-tumbling-diamonds.jpg" },
  { id: 8, name: "Triple Fu Lu Shou", image: "/assets/images/rrg/vivo-triplefulushou.jpg" },
  { id: 9, name: "Big Size Fishin", image: "/assets/images/rrg/vivo-bigsizefishin.jpg" },
  { id: 10, name: "Guardian of Ra", image: "/assets/images/rrg/rrg-vivo-guardianofra.jpg" },
  { id: 11, name: "Triple Jewel of Egypt", image: "/assets/images/rrg/vivo-triplejewelofegypt.jpg" },
  { id: 12, name: "Super 70 Stars", image: "/assets/images/rrg/vivo-super70stars.jpg" },
  { id: 13, name: "Grand Bison", image: "/assets/images/rrg/vivo-grandbison.jpg" },
  { id: 14, name: "Viva Fiesta", image: "/assets/images/rrg/vivo-vivafiesta.jpg" },
  { id: 15, name: "Cleopatra", image: "/assets/images/rrg/rrg-slot-cleopatra.jpg" },
  { id: 16, name: "Dragons 3 Rake It In", image: "/assets/images/rrg/vivo-dragons3rakeitin.jpg" },
];

// 247px card width + 20px gap = 267px
const CARD_WIDTH = 267;
const AUTOPLAY_DELAY = 3000;

// How far the track can scroll before the last card reaches the right edge
function getMaxOffset(track) {
  return Math.max(0, track.scrollWidth - track.clientWidth);
}

export default function RedRakeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Number of distinct scroll positions (one bullet each); depends on the visible width
  const [slideCount, setSlideCount] = useState(redRakeGames.length);
  const trackRef = useRef(null);

  // Recalculate the reachable positions on mount and on resize
  useEffect(() => {
    const updateSlideCount = () => {
      const track = trackRef.current;
      if (!track) return;
      const count = Math.ceil(getMaxOffset(track) / CARD_WIDTH) + 1;
      setSlideCount(Math.min(count, redRakeGames.length));
    };
    updateSlideCount();
    window.addEventListener("resize", updateSlideCount);
    return () => window.removeEventListener("resize", updateSlideCount);
  }, []);

  // Keep the active slide in range if the screen got wider
  useEffect(() => {
    if (activeIndex > slideCount - 1) setActiveIndex(slideCount - 1);
  }, [activeIndex, slideCount]);

  // Move the track whenever the active slide changes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const offset = Math.min(activeIndex * CARD_WIDTH, getMaxOffset(track));
    track.style.transform = `translate3d(-${offset}px, 0px, 0px)`;
  }, [activeIndex, slideCount]);

  // Autoplay: advance one card at a time and loop back after the last position.
  // Depending on activeIndex restarts the timer after a manual bullet click.
  useEffect(() => {
    if (isPaused || slideCount < 2) return;
    const timer = setTimeout(() => {
      setActiveIndex((activeIndex + 1) % slideCount);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, slideCount]);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <section id="casino-lobby" className={styles.redRakeSection}>
      <div className={styles.redRakeHeading}>
        <h2>Recomendados de RedRake</h2>
      </div>

      <div
        className={styles.blogSliderWrapper}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={trackRef} className={styles.blogSliderTrack}>
          {redRakeGames.map((game, index) => (
            <div
              key={game.id}
              className={styles.blogItemCard}
              title={game.name}
            >
              <Link href={`/casino?system=505&game=${game.id}`}>
                <img
                  src={game.image}
                  alt={game.name}
                  className={styles.gameImg}
                  loading="lazy"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination bullets */}
      <div className={styles.swiperPagination}>
        {Array.from({ length: slideCount }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.paginationBullet} ${
              index === activeIndex ? styles.bulletActive : ""
            }`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
