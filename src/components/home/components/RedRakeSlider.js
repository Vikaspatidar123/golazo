import React, { useState, useRef } from "react";
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

export default function RedRakeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
    if (trackRef.current) {
      // 247px card width + 20px gap = 267px
      const cardWidth = 267;
      trackRef.current.style.transform = `translate3d(-${index * cardWidth}px, 0px, 0px)`;
    }
  };

  return (
    <section id="casino-lobby" className={styles.redRakeSection}>
      <div className={styles.redRakeHeading}>
        <h2>Recomendados de RedRake</h2>
      </div>

      <div className={styles.blogSliderWrapper}>
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
        {redRakeGames.map((_, index) => (
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
