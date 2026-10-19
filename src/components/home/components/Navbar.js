import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../style.module.scss";

export default function Navbar({ onOpenModal, onOpenDrawer }) {
  const router = useRouter();
  const [balance, setBalance] = useState("0,00");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const supportRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (supportRef.current && !supportRef.current.contains(event.target)) {
        setSupportDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRefreshBalance = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        {/* Mobile Hamburger */}
        <button
          type="button"
          className={styles.hamburgerBtn}
          onClick={onOpenDrawer}
          aria-label="Menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Desktop Nav Links */}
        <ul className={styles.desktopNavLinks}>
          <li>
            <Link href="/" className={`${styles.navLink} ${styles.active}`}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/casino" className={styles.navLink}>
              Slots
            </Link>
          </li>
          <li>
            <Link href="/livecasino" className={styles.navLink}>
              Casino Vivo
            </Link>
          </li>
          <li>
            <Link href="/crazzy_win" className={styles.navLink}>
              CrazZy Win!
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.navRight}>
        {/* Balance with Sync Icon */}
        <div
          className={styles.balanceBox}
          onClick={handleRefreshBalance}
          title="Actualizar saldo"
        >
          <i
            className={`fas fa-sync-alt ${styles.syncIcon} ${
              isRefreshing ? styles.spinning : ""
            }`}
          ></i>
          <span className={styles.balanceAmount}>{balance}</span>
        </div>

        {/* Support Dropdown */}
        <div className={styles.dropdownContainer} ref={supportRef}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => {
              setSupportDropdownOpen(!supportDropdownOpen);
              setUserDropdownOpen(false);
            }}
            title="Mesa de ayuda y notificaciones"
          >
            <i className="far fa-comment-dots"></i>
          </button>

          {supportDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>• Mesa de ayuda •</div>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setSupportDropdownOpen(false);
                  onOpenModal("support");
                }}
              >
                <i className="fas fa-paper-plane mr-2"></i>
                <span>Reportar un problema</span>
              </button>
              <div className={styles.dropdownHeader}>• Notificaciones •</div>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setSupportDropdownOpen(false);
                  onOpenModal("notifications");
                }}
              >
                <i className="fas fa-bell mr-2"></i>
                <span>Ver notificaciones</span>
              </button>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className={styles.dropdownContainer} ref={userRef}>
          <button
            type="button"
            className={styles.userProfileBtn}
            onClick={() => {
              setUserDropdownOpen(!userDropdownOpen);
              setSupportDropdownOpen(false);
            }}
          >
            <i className={`far fa-user ${styles.userIcon}`}></i>
            <span className={styles.usernameText}>Casinoarg0350</span>
          </button>

          {userDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setUserDropdownOpen(false);
                  onOpenModal("password");
                }}
              >
                <i className="fas fa-key mr-2"></i>
                <span>Cambiar contraseña</span>
              </button>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setUserDropdownOpen(false);
                  onOpenModal("language");
                }}
              >
                <i className="fas fa-globe mr-2"></i>
                <span>Cambiar Idioma</span>
              </button>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setUserDropdownOpen(false);
                  onOpenModal("history");
                }}
              >
                <i className="fas fa-history mr-2"></i>
                <span>Historial de Saldo</span>
              </button>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setUserDropdownOpen(false);
                  onOpenModal("loginHistory");
                }}
              >
                <i className="fas fa-sign-in-alt mr-2"></i>
                <span>Historial de Ingresos</span>
              </button>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setUserDropdownOpen(false);
                  onOpenModal("rules");
                }}
              >
                <i className="fas fa-book mr-2"></i>
                <span>Reglamento Deportes</span>
              </button>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setUserDropdownOpen(false);
                  onOpenModal("limits");
                }}
              >
                <i className="fas fa-sliders-h mr-2"></i>
                <span>Limites de apuestas</span>
              </button>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setUserDropdownOpen(false);
                  onOpenModal("agent");
                }}
              >
                <i className="fas fa-user-shield mr-2"></i>
                <span>Contactar a mi Agente</span>
              </button>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={handleLogout}
              >
                <i className="fas fa-power-off mr-2 text-danger"></i>
                <span>Cerrar sesion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
