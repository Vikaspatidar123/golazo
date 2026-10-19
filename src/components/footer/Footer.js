import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <img
              src="/images/golazo-logo.svg"
              alt="Golazo.club"
              className={styles.footerLogo}
            />
            <p className={styles.brandDesc}>
              Golazo.club é a plataforma líder em entretenimento esportivo,
              oferecendo resultados em tempo real, melhores cotações e cobertura
              das principais ligas do mundo.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <span className={styles.ageBadge}>18+</span>
              <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                Jogue com responsabilidade. Proibido para menores de 18 anos.
              </span>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Navegação</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/">Início</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/login">Acessar Conta</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/login?tab=register">Criar Conta</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/?filter=aovivo">Partidas Ao Vivo</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Suporte & Termos</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a href="#termos" onClick={(e) => { e.preventDefault(); alert("Termos e Condições"); }}>Termos & Condições</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#regulamento" onClick={(e) => { e.preventDefault(); alert("Regulamento Esportivo"); }}>Regulamento Esportivo</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#ajuda" onClick={(e) => { e.preventDefault(); alert("Central de Atendimento"); }}>Central de Ajuda</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Golazo.club - Todos os direitos reservados.</p>
          <p>Plataforma Desenvolvida com Next.js</p>
        </div>
      </div>
    </footer>
  );
}
