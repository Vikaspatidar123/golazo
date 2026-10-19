import React from "react";
import Link from "next/link";
import styles from "../style.module.scss";

export default function SideDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.drawerOverlay} onClick={onClose} />

      {/* Drawer */}
      <div className={styles.drawerContent} id="slide-out">
        <div>
          <div className={styles.drawerHeader}>
            <h5 className={styles.drawerTitle}>Menú</h5>
            <button
              type="button"
              className={styles.drawerCloseBtn}
              onClick={onClose}
              aria-label="Cerrar menú"
            >
              &times;
            </button>
          </div>

          <ul className={styles.drawerList}>
            <li>
              <Link
                href="/"
                className={`${styles.drawerItem} ${styles.active}`}
                onClick={onClose}
              >
                <img
                  src="https://cdn.golazo.club/images/side_menu/index.png"
                  alt="Inicio"
                />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/casino"
                className={styles.drawerItem}
                onClick={onClose}
              >
                <img
                  src="https://cdn.golazo.club/images/side_menu/casino.png"
                  alt="Slots"
                />
                <span>Slots</span>
              </Link>
            </li>
            <li>
              <Link
                href="/livecasino"
                className={styles.drawerItem}
                onClick={onClose}
              >
                <img
                  src="https://cdn.golazo.club/images/side_menu/livecasino.png"
                  alt="Casino Vivo"
                />
                <span>Casino Vivo</span>
              </Link>
            </li>
            <li>
              <Link
                href="/crazzy_win"
                className={styles.drawerItem}
                onClick={onClose}
              >
                <img
                  src="https://cdn.golazo.club/images/side_menu/crazzy_win.png"
                  alt="CrazZy Win!"
                />
                <span>CrazZy Win!</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Promo banner at bottom */}
        <div>
          <img
            src="https://cdn.golazo.club/mkt/images/es/sidenav_promo.png"
            id="sidenav-promo-banner"
            alt="Promoción"
            className={styles.drawerPromoBanner}
          />
        </div>
      </div>
    </>
  );
}
