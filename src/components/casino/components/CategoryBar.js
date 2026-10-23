import React, { useRef, useState } from "react";
import styles from "../style.module.scss";
import { CASINO_PROVIDERS } from "../constants";

export default function CategoryBar({
  activeSystem,
  activeFilter,
  searchQuery,
  onSelectSystem,
  onSelectFilter,
  onSearchChange,
  onSearchSubmit,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleProviderClick = (provider, e) => {
    onSelectSystem(provider.id);
    // Smooth scroll the selected button to center if horizontally scrolled
    if (scrollContainerRef.current && e?.currentTarget) {
      const container = scrollContainerRef.current;
      const target = e.currentTarget;
      const scrollPos =
        target.offsetLeft - container.offsetWidth / 2 + target.offsetWidth / 2;
      container.scrollTo({ left: scrollPos, behavior: "smooth" });
    }
    // Automatically collapse after selecting a provider, matching live site
    setIsExpanded(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div id="games_categories" className={styles.gamesCategories}>
      {/* Top Action Buttons & Search */}
      <div id="games_actions" className={styles.gamesActions}>
        <div id="games_btn_group" className={styles.gamesBtnGroup}>
          <button
            type="button"
            id="cat_list_item_id_9998"
            className={`${styles.catListItem} ${styles.actionBtn} ${
              activeFilter === "favorites" ? styles.active : ""
            }`}
            onClick={() => onSelectFilter("favorites")}
          >
            ❤ Favorites
          </button>

          <button
            type="button"
            id="cat_list_item_id_9999"
            className={`${styles.catListItem} ${styles.actionBtn} ${
              activeFilter === "recent" ? styles.active : ""
            }`}
            onClick={() => onSelectFilter("recent")}
          >
            ⟳ Recent
          </button>

          {/* Search box */}
          <form
            id="btnsearch"
            className={styles.searchBox}
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearchSubmit) onSearchSubmit();
            }}
          >
            <input
              type="text"
              id="search-text"
              className={styles.inputSearch}
              placeholder="Buscar jogo..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button
              type="submit"
              id="cat_list_search_2"
              className={styles.btnSearchSubmit}
              title="Buscar"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div style={{ clear: "both" }}></div>
        </div>
      </div>

      {/* Provider List Row with Smooth Expand/Collapse */}
      <div className={styles.catListInsideWrapper}>
        <div
          ref={scrollContainerRef}
          className={`${styles.catListInside} ${
            isExpanded ? styles.catListInsideExpand : ""
          }`}
        >
          {/* Toggle chevron button on the far right of row 1 */}
          <button
            type="button"
            id="cat_list_more"
            className={styles.catListMore}
            onClick={handleToggleExpand}
            title={isExpanded ? "Recolher provedores" : "Expandir provedores"}
          >
            <i
              className={`fas ${
                isExpanded ? "fa-chevron-up" : "fa-chevron-down"
              }`}
            ></i>
          </button>

          {CASINO_PROVIDERS.map((provider) => {
            const isActive =
              !activeFilter && String(activeSystem) === String(provider.id);
            return (
              <button
                key={provider.id}
                type="button"
                data-system-id={provider.id}
                id={`cat_list_item_id_${provider.id}`}
                className={`${styles.catListItem} ${
                  isActive ? styles.active : ""
                }`}
                onClick={(e) => handleProviderClick(provider, e)}
              >
                {provider.name}
              </button>
            );
          })}
        </div>

        {/* Bottom Centered Chevron Collapse Button */}
        <div
          className={`${styles.catButtonDown} ${
            isExpanded ? styles.catButtonDownExpanded : ""
          }`}
          onClick={handleToggleExpand}
          title={isExpanded ? "Recolher" : "Expandir"}
        >
          <i
            id="btn_collapse"
            className={`fas ${
              isExpanded ? "fa-chevron-up" : "fa-chevron-down"
            } ${isExpanded ? styles.showCollapse : ""}`}
          ></i>
        </div>
      </div>
    </div>
  );
}
