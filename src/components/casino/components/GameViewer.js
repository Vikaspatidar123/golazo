import React, { useRef, useState } from "react";
import styles from "../style.module.scss";

export default function GameViewer({
  activeGame,
  isFavorite,
  onToggleFavorite,
  onClose,
  onScrollToCategories,
}) {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [iframeKey, setIframeKey] = useState(0);

  if (!activeGame) return null;

  const { system, pagecode, name, providerPath } = activeGame;

  // Golazo session or demo game URL
  const gameUrl = `https://golazo.club/game.php?system=${system}&pagecode=${pagecode}&name=${encodeURIComponent(
    name
  )}&mobile=0`;

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handlePopup = () => {
    const width = Math.min(1280, window.innerWidth * 0.9);
    const height = Math.min(800, window.innerHeight * 0.9);
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      gameUrl,
      `golazo_game_${system}_${pagecode}`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=yes,status=no`
    );
  };

  return (
    <div
      id="current_container"
      ref={containerRef}
      className={styles.currentContainer}
    >
      <div className={styles.currentContainerFlex}>
        {/* Game iframe */}
        <div id="current_container_game" className={styles.gameObjectWrapper}>
          <iframe
            key={iframeKey}
            ref={iframeRef}
            id="game_object"
            className={styles.gameObjectIframe}
            src={gameUrl}
            title={name}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        {/* Right Sidebar Control Menu */}
        <div id="current_container_menu" className={styles.currentContainerMenu}>
          <ul>
            <li
              id="current_container_menu_fullscreen"
              title="Tela Cheia (FullScreen)"
              onClick={handleFullscreen}
            >
              <i className="fas fa-expand-arrows-alt"></i>
            </li>
            <li
              id="current_container_menu_refresh"
              title="Recarregar Jogo (Refresh)"
              onClick={handleRefresh}
            >
              <i className="fas fa-redo"></i>
            </li>
            <li
              id="current_container_menu_popup"
              title="Abrir em nova janela (Popup)"
              onClick={handlePopup}
            >
              <i className="far fa-clone"></i>
            </li>
            <li
              id="current_container_menu_favorite"
              title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
              className={isFavorite ? styles.favoriteActive : ""}
              onClick={() => onToggleFavorite(activeGame)}
            >
              <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
            </li>
            <li
              id="current_container_menu_categories"
              title="Mais jogos (Categorias)"
              onClick={onScrollToCategories}
            >
              <i className="fas fa-grip-horizontal"></i>
            </li>
            <li
              title="Fechar Jogo"
              className={styles.closeBtn}
              onClick={onClose}
            >
              <i className="fas fa-times"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
