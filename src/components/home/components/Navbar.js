import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../style.module.scss";

export default function Navbar({ onOpenModal, onOpenDrawer, onRefreshBalance }) {
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
    if (onRefreshBalance) {
      onRefreshBalance();
    }
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
            <div className={`${styles.dropdownMenu} ${styles.supportDropdownMenu}`}>
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
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setSupportDropdownOpen(false);
                  if (onRefreshBalance) {
                    onRefreshBalance({
                      type: "deposit",
                      title: "Notification",
                      time: "9s",
                      message: "Successful deposit: 100,00 credits",
                    });
                  }
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
            id="userDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={userDropdownOpen}
            onClick={() => {
              setUserDropdownOpen(!userDropdownOpen);
              setSupportDropdownOpen(false);
            }}
          >
            <i className={`far fa-user ${styles.userIcon}`}></i>
            <span className={styles.usernameText}>Casinoarg0350</span>
          </button>

          {userDropdownOpen && (
            <div
              className={`dropdown-menu dropdown-menu-right user-profile-dropdown show ${styles.dropdownMenu}`}
              aria-labelledby="userDropdown"
            >
              <a
                className={`dropdown-item waves-effect waves-light ${styles.dropdownItem}`}
                href="#"
                id="ChangeOwnPassword"
                onClick={(e) => {
                  e.preventDefault();
                  setUserDropdownOpen(false);
                  onOpenModal("password");
                }}
              >
                Cambiar contraseña
              </a>
              <a
                className={`dropdown-item waves-effect waves-light ${styles.dropdownItem}`}
                href="#"
                id="ChangeLanguage"
                onClick={(e) => {
                  e.preventDefault();
                  setUserDropdownOpen(false);
                  onOpenModal("language");
                }}
              >
                Cambiar Idioma
              </a>
              <a
                className={`dropdown-item waves-effect waves-light ${styles.dropdownItem}`}
                href="#"
                id="History"
                onClick={(e) => {
                  e.preventDefault();
                  setUserDropdownOpen(false);
                  onOpenModal("history");
                }}
              >
                Historial de Saldo
              </a>
              <a
                className={`dropdown-item waves-effect waves-light ${styles.dropdownItem}`}
                href="#"
                id="LoginHistory"
                onClick={(e) => {
                  e.preventDefault();
                  setUserDropdownOpen(false);
                  onOpenModal("loginHistory");
                }}
              >
                Historial de Ingresos
              </a>
              <a
                className={`dropdown-item waves-effect waves-light ${styles.dropdownItem}`}
                href="#"
                id="Rules"
                onClick={(e) => {
                  e.preventDefault();
                  setUserDropdownOpen(false);
                  onOpenModal("rules");
                }}
              >
                Reglamento Deportes
              </a>
              <a
                className={`dropdown-item waves-effect waves-light ${styles.dropdownItem}`}
                href="#"
                id="OwnLimits"
                onClick={(e) => {
                  e.preventDefault();
                  setUserDropdownOpen(false);
                  onOpenModal("limits");
                }}
              >
                Limites de apuestas
              </a>
              <a
                className={`dropdown-item waves-effect waves-light ${styles.dropdownItem}`}
                href="#"
                id="ContactParent"
                onClick={(e) => {
                  e.preventDefault();
                  setUserDropdownOpen(false);
                  onOpenModal("agent");
                }}
              >
                Contactar a mi Agente
              </a>
              <a
                className={`dropdown-item waves-effect waves-light ${styles.dropdownItem}`}
                href="#"
                id="Logout"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Cerrar sesion
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
