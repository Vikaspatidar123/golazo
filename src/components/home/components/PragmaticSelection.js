import React from "react";
import Link from "next/link";
import styles from "../style.module.scss";

const pragmaticCards = [
  {
    id: "2244",
    title: "Gates of Olimpus Roulette",
    image: "https://cdn.golazo.club/games_images/pragmatic/2244.orig.jpg",
    url: "/livecasino?system=500&pagecode=2244",
  },
  {
    id: "103",
    title: "Lobby Blackjack",
    image: "https://cdn.golazo.club/games_images/pragmatic/103.orig.jpg",
    url: "/livecasino?system=500&pagecode=103",
  },
];

export default function PragmaticSelection() {
  return (
    <section>
      <h2 className={styles.categoryTitle}>
        Nuestra seleccion Pragmatic Live Casino
      </h2>

      <div className={styles.pragmaticGrid}>
        {pragmaticCards.map((card) => (
          <Link key={card.id} href={card.url} className={styles.collectionCard}>
            <img
              src={card.image}
              alt={card.title}
              className={styles.cardImg}
              loading="lazy"
            />
            <div className={styles.cardMask}>
              <p className={styles.titleAction}>{card.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
