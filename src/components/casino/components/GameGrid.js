import React from "react";
import styles from "../style.module.scss";
import { CDN_BASE_URL, getProviderPath } from "../constants";

export default function GameGrid({
  games = [],
  activeSystem,
  activeFilter,
  isLoading,
  onSelectGame,
  onToggleFavorite,
  isFavorite,
  onResetFilter,
}) {
  if (isLoading) {
    return (
      <section id="games_container" className={styles.gamesSection}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando jogos...</p>
        </div>
      </section>
    );
  }

  if (games.length === 0) {
    return (
      <section id="games_container" className={styles.gamesSection}>
        <div className={styles.emptyState}>
          <i className="fas fa-dice"></i>
          <h3>Nenhum jogo encontrado</h3>
          <p>
            {activeFilter === "favorites"
              ? "Você ainda não possui nenhum jogo favorito. Clique no coração para favoritar!"
              : activeFilter === "recent"
              ? "Você ainda não jogou nenhum jogo recentemente."
              : "Não foram encontrados jogos para os critérios de busca."}
          </p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={onResetFilter}
          >
            Ver todos os jogos
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="games_container" className={styles.gamesSection}>
      <div className={styles.gamesGrid}>
        {games.map((item, index) => {
          // Normalize game item format
          const pagecode = item.pagecode || item[0];
          const name = item.name || item[1];
          const imgname = item.imgname || item[2];
          const system = String(item.system || activeSystem || "505");
          const pPath = item.providerPath || getProviderPath(system);

          const imageUrl = `${CDN_BASE_URL}games_images/${pPath}${imgname}`;
          const isFav = isFavorite(system, pagecode);

          const gameObj = {
            system,
            pagecode,
            name,
            imgname,
            providerPath: pPath,
          };

          return (
            <div
              key={`${system}-${pagecode}-${index}`}
              className={styles.gameItem}
              data-system={system}
              data-pagecode={pagecode}
              data-imgname={imgname}
              title={name}
              onClick={() => onSelectGame(gameObj)}
            >
              {/* Heart Favorite button */}
              <div
                className={styles.heartInGame}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(gameObj, e);
                }}
                title={isFav ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
              >
                <i
                  className={`fas fa-heart ${
                    isFav ? styles.heartYellow : styles.heartWhite
                  }`}
                ></i>
              </div>

              {/* Game Thumbnail */}
              <div className={styles.imageWrapper}>
                <img
                  src={imageUrl}
                  alt={name}
                  className={styles.gameImage}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to placeholder image if remote image fails
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://cdn.golazo.club/images/side_menu/casino.png";
                  }}
                />

                {/* Hover Play Button Overlay */}
                <div className={styles.playOverlay}>
                  <i className="far fa-play-circle"></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
