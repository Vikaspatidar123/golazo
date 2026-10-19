import React, { useState } from "react";
import styles from "./style.module.scss";

import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import HeroCarousel from "./components/HeroCarousel";
import PragmaticSelection from "./components/PragmaticSelection";
import RedRakeSlider from "./components/RedRakeSlider";
import LiveCasinoSlider from "./components/LiveCasinoSlider";
import Footer from "./components/Footer";

import ChangePasswordModal from "./components/Modals/ChangePasswordModal";
import BetLimitsModal from "./components/Modals/BetLimitsModal";
import ContactAgentModal from "./components/Modals/ContactAgentModal";
import LanguageModal from "./components/Modals/LanguageModal";
import SupportModal from "./components/Modals/SupportModal";

export default function HomeView() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className={styles.homeWrapper}>
      {/* Fixed Top Navbar */}
      <Navbar
        onOpenModal={handleOpenModal}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      {/* Mobile Drawer */}
      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Lobby Carousel */}
        <HeroCarousel />

        {/* Central Content Sections */}
        <div className={styles.mainContainer}>
          {/* Pragmatic 2-Card Selection */}
          <PragmaticSelection />

          {/* RedRake 16-Game Slider */}
          <RedRakeSlider />

          {/* Live Casino 10-Table Slider */}
          <LiveCasinoSlider />
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Modals */}
      <ChangePasswordModal
        isOpen={activeModal === "password"}
        onClose={handleCloseModal}
      />
      <BetLimitsModal
        isOpen={activeModal === "limits"}
        onClose={handleCloseModal}
      />
      <ContactAgentModal
        isOpen={activeModal === "agent"}
        onClose={handleCloseModal}
      />
      <LanguageModal
        isOpen={activeModal === "language"}
        onClose={handleCloseModal}
      />
      <SupportModal
        isOpen={activeModal === "support" || activeModal === "notifications"}
        mode={activeModal === "notifications" ? "notifications" : "support"}
        onClose={handleCloseModal}
      />
      <BetLimitsModal
        isOpen={activeModal === "rules"}
        onClose={handleCloseModal}
      />
    </div>
  );
}
