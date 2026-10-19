import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import SubMenu from "./SubMenu";
import { Menu, X, User, Lock, ArrowRight } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickUser, setQuickUser] = useState("");
  const [quickPass, setQuickPass] = useState("");

  const handleQuickLogin = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/login",
      query: { user: quickUser },
    });
  };

  return (
    <header className={styles.headerContainer}>
      {/* Top Main Navigation */}
      <div className={styles.topNav}>
        <Link href="/" className={styles.brand}>
          <img
            src="/images/golazo-logo.svg"
            alt="Golazo.club Logo"
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop Quick Auth Actions */}
        <div className={styles.headerActions}>
          <Link href="/login?tab=register" className={styles.quickRegisterBtn}>
            Cadastrar-se
          </Link>

          <form onSubmit={handleQuickLogin} className={styles.quickLoginForm}>
            <input
              type="text"
              placeholder="Usuário"
              value={quickUser}
              onChange={(e) => setQuickUser(e.target.value)}
              className={styles.quickInput}
            />
            <input
              type="password"
              placeholder="Senha"
              value={quickPass}
              onChange={(e) => setQuickPass(e.target.value)}
              className={styles.quickInput}
            />
            <button type="submit" className={styles.quickRegisterBtn}>
              Entrar
            </button>
          </form>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Actions Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <Link
            href="/login"
            className={styles.quickLoginBtn}
            onClick={() => setMobileMenuOpen(false)}
          >
            Acessar Conta (Login)
          </Link>
          <Link
            href="/login?tab=register"
            className={styles.quickRegisterBtn}
            onClick={() => setMobileMenuOpen(false)}
          >
            Cadastrar-se Agora
          </Link>
        </div>
      )}

      {/* Secondary Sports SubMenu Bar */}
      <SubMenu />
    </header>
  );
}
