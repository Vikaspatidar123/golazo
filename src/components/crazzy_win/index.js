import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

// Shared common components
import Navbar from "@/components/home/components/Navbar";
import SideDrawer from "@/components/home/components/SideDrawer";
import NotificationToast from "@/components/home/components/NotificationToast";

// Shared Modals
import ChangePasswordModal from "@/components/home/components/Modals/ChangePasswordModal";
import BetLimitsModal from "@/components/home/components/Modals/BetLimitsModal";
import ContactAgentModal from "@/components/home/components/Modals/ContactAgentModal";
import LanguageModal from "@/components/home/components/Modals/LanguageModal";
import SupportModal from "@/components/home/components/Modals/SupportModal";
import BalanceHistoryModal from "@/components/home/components/Modals/BalanceHistoryModal";
import LoginHistoryModal from "@/components/home/components/Modals/LoginHistoryModal";
import SportsRulesModal from "@/components/home/components/Modals/SportsRulesModal";

const CRAZZY_WIN_GAMES = [
  { pagecode: "vivo-piggyvegas", name: "Piggy Vegas", imgname: "/vivo-piggyvegas.jpg", system: "505" },
  { pagecode: "vivo-lobstersplash2", name: "Lobster Splash 2", imgname: "/vivo-lobstersplash2.jpg", system: "505" },
  { pagecode: "vivo-triplejewelofegypt", name: "Triple Jewel of Egypt", imgname: "/vivo-triplejewelofegypt.jpg", system: "505" },
  { pagecode: "vivo-megacoins2", name: "Mega Coins 2", imgname: "/vivo-megacoins2.jpg", system: "505" },
  { pagecode: "vivo-super70stars", name: "Super 70 Stars", imgname: "/vivo-super70stars.jpg", system: "505" },
  { pagecode: "vivo-supercoins", name: "Super coins", imgname: "/vivo-supercoins.jpg", system: "505" },
  { pagecode: "vivo-dragons3rakeitin", name: "3 Dragons Rake it in", imgname: "/vivo-dragons3rakeitin.jpg", system: "505" },
  { pagecode: "vivo-triplefulushou", name: "Triple Fu Lu Shou", imgname: "/vivo-triplefulushou.jpg", system: "505" },
  { pagecode: "vivo-triplevalentine", name: "Triple Valentine", imgname: "/vivo-triplevalentine.jpg", system: "505" },
  { pagecode: "vivo-egypt", name: "Mysteries Of Egypt", imgname: "/vivo-egypt.jpg", system: "505" },
  { pagecode: "vivo-guardianofra", name: "Guardian Of Ra", imgname: "/rrg-vivo-guardianofra.jpg", system: "505" },
  { pagecode: "vivo-tumbling-diamonds", name: "Queens And Diamonds", imgname: "/rrg-slot-tumbling-diamonds.jpg", system: "505" },
  { pagecode: "vivo-cleopatra", name: "The Asp Of Cleopatra", imgname: "/rrg-slot-cleopatra.jpg", system: "505" },
  { pagecode: "vivo-milliondracula", name: "Million Dracula", imgname: "/vivo-milliondracula.jpg", system: "505" },
  { pagecode: "vivo-vivafiesta", name: "Viva Fiesta", imgname: "/vivo-vivafiesta.jpg", system: "505" },
  { pagecode: "vivo-triplefiesta", name: "Triple Fiesta", imgname: "/vivo-triplefiesta.jpg", system: "505" },
  { pagecode: "vivo-jokerfiesta", name: "Joker Fiesta", imgname: "/vivo-jokerfiesta.jpg", system: "505" },
  { pagecode: "vivo-halloweenwins3", name: "Halloween Wins 3", imgname: "/vivo-halloweenwins3.jpg", system: "505" },
];

export default function CrazzyWinView() {
  const router = useRouter();

  // Navigation & Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Toast Notification
  const [toastData, setToastData] = useState({
    visible: false,
    type: "deposit",
    title: "Notification",
    time: "1s",
    message: "",
  });

  // Active Game State
  const [activeGame, setActiveGame] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef(null);

  // Auto-launch game from URL query params (e.g. ?system=505&pagecode=vivo-piggyvegas)
  useEffect(() => {
    if (router.isReady && router.query.system && router.query.pagecode) {
      const match = CRAZZY_WIN_GAMES.find(
        (g) =>
          String(g.system) === String(router.query.system) &&
          String(g.pagecode) === String(router.query.pagecode)
      );
      if (match) {
        setActiveGame(match);
      } else {
        setActiveGame({
          system: router.query.system,
          pagecode: router.query.pagecode,
          name: router.query.name || "CrazZy Win!",
        });
      }
    }
  }, [router.isReady, router.query]);

  const handleSelectGame = (game) => {
    setActiveGame(game);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    if (!activeGame) return;
    const gameUrl = `https://golazo.club/game.php?system=${activeGame.system}&pagecode=${activeGame.pagecode}&name=${encodeURIComponent(
      activeGame.name
    )}&mobile=0`;
    const width = Math.min(1280, window.innerWidth * 0.9);
    const height = Math.min(800, window.innerHeight * 0.9);
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      gameUrl,
      `golazo_crazzy_${activeGame.system}_${activeGame.pagecode}`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=yes,status=no`
    );
  };

  return (
    <div className={styles.crazzyWinWrapper}>
      {/* Fixed Top Navbar */}
      <Navbar
        onOpenModal={(modal) => setActiveModal(modal)}
        onOpenDrawer={() => setDrawerOpen(true)}
        onRefreshBalance={() =>
          setToastData({
            visible: true,
            type: "deposit",
            title: "Notification",
            time: "1s",
            message: "Saldo atualizado: 0,00 créditos",
          })
        }
      />

      {/* Mobile Drawer */}
      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Main Content */}
      <main id="main" className={styles.mainContent}>
        {/* Fullscreen Interactive Game Viewer */}
        {activeGame && (
          <div
            id="current_container"
            ref={containerRef}
            className={styles.currentContainer}
          >
            <div className={styles.currentContainerFlex}>
              <div id="current_container_game" className={styles.gameObjectWrapper}>
                <iframe
                  key={iframeKey}
                  id="game_object"
                  className={styles.gameObjectIframe}
                  src={`https://golazo.club/game.php?system=${activeGame.system}&pagecode=${activeGame.pagecode}&name=${encodeURIComponent(
                    activeGame.name
                  )}&mobile=0`}
                  title={activeGame.name}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>

              {/* Game Control Sidebar Menu */}
              <div
                id="current_container_menu"
                className={styles.currentContainerMenu}
              >
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
                    title="Fechar Jogo"
                    className={styles.closeBtn}
                    onClick={() => setActiveGame(null)}
                  >
                    <i className="fas fa-times"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Top Banner (CrazZy Win!) */}
        {!activeGame && (
          <div id="banner_container" className={styles.bannerContainer}></div>
        )}

        {/* 18 CrazZy Win Slots Grid */}
        {!activeGame && (
          <div id="games_container" className={styles.gamesContainer}>
            {CRAZZY_WIN_GAMES.map((game) => (
              <div
                key={`${game.system}-${game.pagecode}`}
                className={styles.gameItem}
                data-system={game.system}
                data-pagecode={game.pagecode}
                onClick={() => handleSelectGame(game)}
                title={game.name}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={`https://cdn.golazo.club/games_images/rrg${game.imgname}`}
                    alt={game.name}
                    className={styles.gameImg}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://cdn.golazo.club/images/side_menu/crazzy_win.png";
                    }}
                  />
                  <div className={styles.playOverlay}>
                    <i className="far fa-play-circle"></i>
                  </div>
                </div>
                <div className={styles.footerName}>{game.name}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={activeModal === "password"}
        onClose={() => setActiveModal(null)}
      />
      <BetLimitsModal
        isOpen={activeModal === "limits"}
        onClose={() => setActiveModal(null)}
      />
      <ContactAgentModal
        isOpen={activeModal === "agent"}
        onClose={() => setActiveModal(null)}
      />
      <LanguageModal
        isOpen={activeModal === "language"}
        onClose={() => setActiveModal(null)}
      />
      <SupportModal
        isOpen={activeModal === "support"}
        onClose={() => setActiveModal(null)}
      />
      <BalanceHistoryModal
        isOpen={activeModal === "history"}
        onClose={() => setActiveModal(null)}
      />
      <LoginHistoryModal
        isOpen={activeModal === "loginHistory"}
        onClose={() => setActiveModal(null)}
      />
      <SportsRulesModal
        isOpen={activeModal === "rules"}
        onClose={() => setActiveModal(null)}
      />

      {/* Notifications Toast */}
      <NotificationToast
        visible={toastData.visible}
        type={toastData.type}
        title={toastData.title}
        time={toastData.time}
        message={toastData.message}
        onClose={() => setToastData((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}
