import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { Activity, Ticket, Download, Radio, Trophy } from "lucide-react";

export default function SubMenu() {
  const router = useRouter();

  const handleVirtualTicket = (e) => {
    e.preventDefault();
    const codigo = prompt("Digite o código do bilhete:");
    if (codigo && codigo.trim() !== "") {
      alert(`Consultando bilhete: ${codigo.trim()}`);
    }
  };

  return (
    <div className={styles.subMenu}>
      <div className={styles.subMenuInner}>
        <ul className={styles.sportsList}>
          <li className={styles.sportItem}>
            <Link href="/" className={`${styles.sportLink} ${router.pathname === "/" ? styles.active : ""}`}>
              ⚽ Futebol
            </Link>
          </li>
          <li className={styles.sportItem}>
            <Link href="/?sport=basquete" className={styles.sportLink}>
              🏀 Basquete
            </Link>
          </li>
          <li className={styles.sportItem}>
            <Link href="/?sport=ufc" className={styles.sportLink}>
              🥊 UFC
            </Link>
          </li>
          <li className={styles.sportItem}>
            <Link href="/?sport=volei" className={styles.sportLink}>
              🏐 Vôlei
            </Link>
          </li>
          <li className={styles.sportItem}>
            <Link href="/?sport=futebol-americano" className={styles.sportLink}>
              🏈 Futebol Americano
            </Link>
          </li>
        </ul>

        <div className={styles.subActions}>
          <button
            type="button"
            onClick={handleVirtualTicket}
            className={styles.subActionBtn}
          >
            <Ticket size={15} />
            <span>Consultar Bilhete</span>
          </button>

          <Link href="/?filter=aovivo" className={`${styles.subActionBtn} ${styles.live}`}>
            <Radio size={15} />
            <span>Ao Vivo</span>
          </Link>

          <button
            type="button"
            onClick={handleVirtualTicket}
            className={styles.subActionBtn}
          >
            <Trophy size={15} />
            <span>Bilhete Virtual</span>
          </button>

          <a
            href="#download-app"
            onClick={(e) => {
              e.preventDefault();
              alert("Baixando aplicativo Golazo Mobile APK...");
            }}
            className={styles.subActionBtn}
          >
            <Download size={15} />
            <span>Baixe o App</span>
          </a>
        </div>
      </div>
    </div>
  );
}
