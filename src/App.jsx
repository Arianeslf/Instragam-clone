import React from "react";
import Sidebar from "./components/Sidebar";
import Stories from "./components/Stories";
import Feed from "./components/Feed";
import Suggestions from "./components/Suggestions";
import MessageButton from "./components/MessageButton";
import MobileNav from "./components/MobileNav";

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <div className="center-column">
          {/* Header visível só no mobile */}
          <div className="mobile-feed-header">
            <span className="mobile-feed-header-logo">Instagrão</span>
            <div className="mobile-feed-header-icons">
              {/* Curtidas / notificações */}
              <button title="Atividade">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              {/* Mensagens */}
              <button title="Mensagens" style={{ position: "relative" }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="mobile-header-badge">9+</span>
              </button>
            </div>
          </div>

          <Stories />
          <Feed />
        </div>

        <Suggestions />
      </div>

      <MessageButton />
      <MobileNav />
    </div>
  );
}
