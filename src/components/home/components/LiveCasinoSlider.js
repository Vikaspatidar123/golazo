import React, { useRef } from "react";
import Link from "next/link";
import styles from "../style.module.scss";

const liveTables = [
  { id: 1, img: "/assets/images/lobby/livecasino_001.png", name: "Live Casino Table 1" },
  { id: 2, img: "/assets/images/lobby/livecasino_002.png", name: "Live Casino Table 2" },
  { id: 3, img: "/assets/images/lobby/livecasino_003.png", name: "Live Casino Table 3" },
  { id: 4, img: "/assets/images/lobby/livecasino_004.png", name: "Live Casino Table 4" },
  { id: 5, img: "/assets/images/lobby/livecasino_005.png", name: "Live Casino Table 5" },
  { id: 6, img: "/assets/images/lobby/livecasino_006.png", name: "Live Casino Table 6" },
  { id: 7, img: "/assets/images/lobby/livecasino_007.png", name: "Live Casino Table 7" },
  { id: 8, img: "/assets/images/lobby/livecasino_008.png", name: "Live Casino Table 8" },
  { id: 9, img: "/assets/images/lobby/livecasino_009.png", name: "Live Casino Table 9" },
  { id: 10, img: "/assets/images/lobby/livecasino_010.png", name: "Live Casino Table 10" },
];

export default function LiveCasinoSlider() {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 240 * 2; // scroll 2 cards
    scrollContainerRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="livecasino-lobby" className={styles.liveCasinoSection}>
      <h3 className={styles.categoryTitle}>MESAS EN VIVO SELECCIONADAS</h3>

      <div className={styles.liveCasinoTrackWrapper}>
        <button
          type="button"
          className={`${styles.liveNavBtn} ${styles.liveNavPrev}`}
          onClick={() => handleScroll("prev")}
          aria-label="Anterior"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div
          ref={scrollContainerRef}
          className={styles.liveCasinoTrack}
          style={{ overflowX: "auto", scrollbarWidth: "none" }}
        >
          {liveTables.map((table) => (
            <div key={table.id} className={styles.liveCasinoCard}>
              <Link href="/livecasino">
                <img
                  src={table.img}
                  alt={table.name}
                  className={styles.tableImg}
                  loading="lazy"
                />
              </Link>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.liveNavBtn} ${styles.liveNavNext}`}
          onClick={() => handleScroll("next")}
          aria-label="Siguiente"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
