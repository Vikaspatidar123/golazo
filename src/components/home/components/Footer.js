import React from "react";
import Link from "next/link";
import styles from "../style.module.scss";

export default function Footer({ onOpenModal }) {
  return (
    <footer className={styles.pageFooter}>
      {/* Orange Social Strip */}
      <div className={styles.socialStrip} id="social_links">
        <div className={styles.socialContainer}>
          <h6 className={styles.socialHeading}>
            Seguinos en nuestras redes sociales!
          </h6>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* 4-Column Footer */}
      <div className={styles.footerContent}>
        <div>
          <p className={styles.brandSummary}>© Golazo</p>
        </div>

        <div>
          <h6 className={styles.footerColTitle}>PRODUCTOS</h6>
          <div className={styles.accentDivider}></div>
          <ul className={styles.footerLinkList}>
            <li>
              <Link href="/casino">Slots</Link>
            </li>
            <li>
              <Link href="/livecasino">Casino Vivo</Link>
            </li>
            <li>
              <Link href="/crazzy_win">CrazZy Win!</Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className={styles.footerColTitle}>NOSOTROS</h6>
          <div className={styles.accentDivider}></div>
          <ul className={styles.footerLinkList}>
            <li>
              <a
                href="#tac"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenModal) onOpenModal("rules");
                }}
              >
                Terminos y Condiciones
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenModal) onOpenModal("rules");
                }}
              >
                Politica de Privacidad
              </a>
            </li>
            <li>
              <a
                href="#responsible"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenModal) onOpenModal("rules");
                }}
              >
                Juego Responsable
              </a>
            </li>
          </ul>
        </div>

        <div id="footer_promo">
          <h6 className={styles.footerColTitle}>PROMOCIONES</h6>
          <div className={styles.accentDivider}></div>
          <ul className={styles.footerLinkList}>
            <li>
              <Link href="/crazzy_win" className="footer-promotion" data-id="801">
                Spinomenal Con SPinomenal
              </Link>
            </li>
            <li>
              <Link href="/casino?system=505" className="footer-promotion" data-id="800">
                Halloween Free Spin
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Regulatory Copyright Note */}
      <div className={styles.footerCopyright}>
        <img
          src="/assets/images/footer/18.svg"
          alt="18+"
          width="30"
          height="30"
        />
        <img
          src="/assets/images/footer/gt-logo.png"
          alt="GT Logo"
          width="50"
          height="22"
        />
        <span>
          Juega responsablemente. Para mayor información visita:
        </span>
        <a
          href="https://www.gamblingtherapy.org/es"
          target="_blank"
          rel="noopener noreferrer"
        >
          GamblingTherapy.org
        </a>
      </div>
    </footer>
  );
}
