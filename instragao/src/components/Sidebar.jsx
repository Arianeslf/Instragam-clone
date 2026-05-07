import React, { useState } from 'react';

const Icon = ({ children }) => (
  <span style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    {children}
  </span>
);

const navItems = [
  {
    id: 'home', label: 'Página inicial', badge: null,
    icon: <img src="/icon-home.svg" alt="home" style={{width:26,height:26,filter:'invert(1)',display:'block'}} />
  },
  {
    id: 'reels', label: 'Reels', badge: null,
    icon: <img src="/icon-reels.svg" alt="reels" style={{width:26,height:26,filter:'invert(1)',display:'block'}} />
  },
  {
    id: 'messages', label: 'Mensagens', badge: '1',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  },
  {
    id: 'search', label: 'Pesquisa', badge: null,
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  },
  {
    id: 'explore', label: 'Explorar', badge: null,
    icon: <img src="/icon-explore.svg" alt="explore" style={{width:26,height:26,filter:'invert(1)',display:'block'}} />
  },
  {
    id: 'notifications', label: 'Notificações', badge: '•',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  },
  {
    id: 'create', label: 'Criar', badge: null,
    icon: <img src="/icon-create.svg" alt="criar" style={{width:26,height:26,filter:'invert(1)',display:'block'}} />
  },
  {
    id: 'dashboard', label: 'Painel', badge: null,
    icon: <img src="/icon-dashboard.svg" alt="painel" style={{width:26,height:26,filter:'invert(1)',display:'block'}} />
  },
];

const bottomItems = [
  {
    id: 'profile', label: 'Perfil', badge: null,
    icon: null, // avatar
  },
  {
    id: 'more', label: 'Mais', badge: null,
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  },
  {
    id: 'meta', label: 'Também da Meta', badge: null,
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="9" height="10" rx="2"/><rect x="13" y="7" width="9" height="10" rx="2"/></svg>
  },
];

export default function Sidebar() {
  const [active, setActive] = useState('home');
  const [expanded, setExpanded] = useState(false);

  const renderItem = (item) => {
    const isActive = active === item.id;
    const iconEl = item.id === 'profile'
      ? <img src="/perfil.jpg" alt="Perfil" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
      : item.icon;

    return (
      <button
        key={item.id}
        className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
        onClick={() => setActive(item.id)}
        title={!expanded ? item.label : ''}
      >
        <span className="sb-icon">
          {iconEl}
          {item.badge && <span className="sidebar-notif">{item.badge}</span>}
        </span>
        {expanded && (
          <span className={`sb-label ${isActive ? 'sb-label-bold' : ''}`}>
            {item.label}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      className={`sidebar ${expanded ? 'sidebar-expanded' : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="sb-logo">
        <img src="/logo-instragao.svg" alt="Instagram" style={{ width: 28, height: 28, filter: 'invert(1)', flexShrink: 0 }} />
        {expanded && <span className="sb-logo-text">Instagram</span>}
      </div>

      {/* Nav principal */}
      <nav style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {navItems.map(renderItem)}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Bottom */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {bottomItems.map(renderItem)}
      </div>
    </aside>
  );
}
