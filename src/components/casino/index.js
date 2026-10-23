import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

import Navbar from "@/components/home/components/Navbar";
import SideDrawer from "@/components/home/components/SideDrawer";
import NotificationToast from "@/components/home/components/NotificationToast";

// Modals
import ChangePasswordModal from "@/components/home/components/Modals/ChangePasswordModal";
import BetLimitsModal from "@/components/home/components/Modals/BetLimitsModal";
import ContactAgentModal from "@/components/home/components/Modals/ContactAgentModal";
import LanguageModal from "@/components/home/components/Modals/LanguageModal";
import SupportModal from "@/components/home/components/Modals/SupportModal";
import BalanceHistoryModal from "@/components/home/components/Modals/BalanceHistoryModal";
import LoginHistoryModal from "@/components/home/components/Modals/LoginHistoryModal";
import SportsRulesModal from "@/components/home/components/Modals/SportsRulesModal";

// Casino components
import GameViewer from "./components/GameViewer";
import CategoryBar from "./components/CategoryBar";
import GameGrid from "./components/GameGrid";
import {
  CDN_BASE_URL,
  CASINO_PROVIDERS,
  getProviderPath,
  FALLBACK_REDRAKE_GAMES,
} from "./constants";

export default function CasinoView() {
  const router = useRouter();

  // Navigation & Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Toast notifications
  const [toastData, setToastData] = useState({
    visible: false,
    type: "deposit",
    title: "Notification",
    time: "1s",
    message: "",
  });

  // Casino State
  const [activeSystem, setActiveSystem] = useState("505"); // RedRake default
  const [activeFilter, setActiveFilter] = useState(null); // null | 'favorites' | 'recent'
  const [searchQuery, setSearchQuery] = useState("");
  const [rawGames, setRawGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGame, setActiveGame] = useState(null);

  // User saved data
  const [favorites, setFavorites] = useState([]);
  const [recentGames, setRecentGames] = useState([]);

  // Cache for fetched provider games
  const [gamesCache, setGamesCache] = useState({});

  // Initialize router query params if present
  useEffect(() => {
    if (router.isReady && router.query.system) {
      setActiveSystem(String(router.query.system));
    }
  }, [router.isReady, router.query.system]);

  // Load favorites & recents from localStorage on mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("golazo_favorites");
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
      const storedRecents = localStorage.getItem("golazo_recent");
      if (storedRecents) {
        setRecentGames(JSON.parse(storedRecents));
      }
    } catch (e) {
      console.warn("Could not read localStorage for casino games", e);
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (newFavs) => {
    setFavorites(newFavs);
    try {
      localStorage.setItem("golazo_favorites", JSON.stringify(newFavs));
    } catch (e) {
      console.warn("Could not save favorites", e);
    }
  };

  // Save recent games to localStorage
  const saveRecent = (newRecents) => {
    setRecentGames(newRecents);
    try {
      localStorage.setItem("golazo_recent", JSON.stringify(newRecents));
    } catch (e) {
      console.warn("Could not save recent games", e);
    }
  };

  // Fetch games for a provider
  const fetchGames = useCallback(
    async (systemId) => {
      // Check cache first
      if (gamesCache[systemId]) {
        setRawGames(gamesCache[systemId]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const providerPath = getProviderPath(systemId);
      const url = `${CDN_BASE_URL}games/${providerPath}/${systemId}_d.json`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch games for system ${systemId}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setRawGames(data);
          setGamesCache((prev) => ({ ...prev, [systemId]: data }));
        } else {
          setRawGames([]);
        }
      } catch (err) {
        console.error("Error fetching casino games:", err);
        // If RedRake fails, use local fallback
        if (String(systemId) === "505") {
          setRawGames(FALLBACK_REDRAKE_GAMES);
        } else {
          setRawGames([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [gamesCache]
  );

  // Fetch when activeSystem changes
  useEffect(() => {
    if (!activeFilter) {
      fetchGames(activeSystem);
    }
  }, [activeSystem, activeFilter, fetchGames]);

  // Check if a game is favorited
  const isFavorite = useCallback(
    (system, pagecode) => {
      return favorites.some(
        (f) =>
          String(f.system) === String(system) &&
          String(f.pagecode) === String(pagecode)
      );
    },
    [favorites]
  );

  // Toggle favorite
  const handleToggleFavorite = (game) => {
    const { system, pagecode, name, imgname, providerPath } = game;
    const exists = isFavorite(system, pagecode);

    let updated;
    if (exists) {
      updated = favorites.filter(
        (f) =>
          !(
            String(f.system) === String(system) &&
            String(f.pagecode) === String(pagecode)
          )
      );
      setToastData({
        visible: true,
        type: "deposit",
        title: "Favoritos",
        time: "Agora",
        message: `${name} foi removido dos favoritos`,
      });
    } else {
      updated = [
        {
          system,
          pagecode,
          name,
          imgname,
          providerPath: providerPath || getProviderPath(system),
        },
        ...favorites,
      ];
      setToastData({
        visible: true,
        type: "deposit",
        title: "Favoritos",
        time: "Agora",
        message: `${name} foi adicionado aos favoritos!`,
      });
    }
    saveFavorites(updated);
  };

  // Select a game to play
  const handleSelectGame = (game) => {
    setActiveGame(game);

    // Add to recent games
    const filteredRecents = recentGames.filter(
      (r) =>
        !(
          String(r.system) === String(game.system) &&
          String(r.pagecode) === String(game.pagecode)
        )
    );
    const updatedRecents = [game, ...filteredRecents].slice(0, 30);
    saveRecent(updatedRecents);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle provider selection
  const handleSelectSystem = (systemId) => {
    setActiveFilter(null);
    setSearchQuery("");
    setActiveSystem(systemId);
  };

  // Handle action filter (favorites or recent)
  const handleSelectFilter = (filterType) => {
    if (activeFilter === filterType) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterType);
      setSearchQuery("");
    }
  };

  // Scroll to categories bar
  const handleScrollToCategories = () => {
    const el = document.getElementById("games_categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reset filters
  const handleResetFilter = () => {
    setActiveFilter(null);
    setSearchQuery("");
    setActiveSystem("505");
  };

  // Filtered games list based on provider, filter, and search
  const displayedGames = useMemo(() => {
    let list = [];

    if (activeFilter === "favorites") {
      list = favorites;
    } else if (activeFilter === "recent") {
      list = recentGames;
    } else {
      list = rawGames;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        const name = (item.name || item[1] || "").toLowerCase();
        return name.includes(q);
      });
    }

    return list;
  }, [activeFilter, favorites, recentGames, rawGames, searchQuery]);

  return (
    <div className={styles.casinoWrapper}>
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

      {/* Main Content Area */}
      <main id="main" className={styles.mainContent}>
        {/* Interactive Game Viewer iframe */}
        <GameViewer
          activeGame={activeGame}
          isFavorite={
            activeGame
              ? isFavorite(activeGame.system, activeGame.pagecode)
              : false
          }
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setActiveGame(null)}
          onScrollToCategories={handleScrollToCategories}
        />

        {/* Sticky Provider & Filter Navigation Bar */}
        <CategoryBar
          activeSystem={activeSystem}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          onSelectSystem={handleSelectSystem}
          onSelectFilter={handleSelectFilter}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => {}}
        />

        {/* Games Grid */}
        <GameGrid
          games={displayedGames}
          activeSystem={activeSystem}
          activeFilter={activeFilter}
          isLoading={isLoading && !activeFilter}
          onSelectGame={handleSelectGame}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          onResetFilter={handleResetFilter}
        />
      </main>

      {/* Standard Golazo Modals */}
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
        isOpen={activeModal === "support" || activeModal === "notifications"}
        mode={activeModal === "notifications" ? "notifications" : "support"}
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

      {/* Fixed Right-Side Notification Toast */}
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
