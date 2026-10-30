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
import BalanceHistoryModal from "./components/Modals/BalanceHistoryModal";
import LoginHistoryModal from "./components/Modals/LoginHistoryModal";
import SportsRulesModal from "./components/Modals/SportsRulesModal";
import NotificationToast from "./components/NotificationToast";

export default function HomeView() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [toastData, setToastData] = useState({
    visible: false,
    type: "deposit",
    title: "Notification",
    time: "9s",
    message: "Successful deposit: 100,00 credits",
  });

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleTriggerToast = (customData) => {
    setToastData((prev) => ({
      visible: true,
      type: customData?.type || (prev.type === "deposit" ? "withdrawal" : "deposit"),
      title: "Notification",
      time: customData?.time || (prev.type === "deposit" ? "5m" : "9s"),
      message:
        customData?.message ||
        (prev.type === "deposit"
          ? "Successful withdrawal: 100,00 credits"
          : "Successful deposit: 100,00 credits"),
    }));
  };

  const handleCloseToast = () => {
    setToastData((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className={styles.homeWrapper}>
      {/* Fixed Top Navbar */}
      <Navbar
        onOpenModal={handleOpenModal}
        onOpenDrawer={() => setDrawerOpen(true)}
        onRefreshBalance={handleTriggerToast}
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

      {/* Modals matching golazo.club reference UI */}
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
      <BalanceHistoryModal
        isOpen={activeModal === "history"}
        onClose={handleCloseModal}
      />
      <LoginHistoryModal
        isOpen={activeModal === "loginHistory"}
        onClose={handleCloseModal}
      />
      <SportsRulesModal
        isOpen={activeModal === "rules"}
        onClose={handleCloseModal}
      />

      {/* Fixed Right-Side Notification Toast */}
      <NotificationToast
        visible={toastData.visible}
        type={toastData.type}
        title={toastData.title}
        time={toastData.time}
        message={toastData.message}
        onClose={handleCloseToast}
      />
    </div>
  );
}
