import React, { useState } from 'react';

const suggestions = [
  { id: 1, username: 'ei_nic',          sub: 'Nicole Dias • Seguido(a) por joaodrummer__', avatar: '/sug1.jpg' },
  { id: 2, username: 'eubiellzn_',      sub: 'Biel • Seguido(a) por user.regis',           avatar: '/sug2.jpg' },
  { id: 3, username: 'dayv_txt',        sub: 'Davi • Seguido(a) por jazz.juk',             avatar: '/sug3.jpg' },
  { id: 4, username: 'k4m4rtins',       sub: 'Kaio Martins • Seguido(a) por juanberruezo', avatar: '/sug4.jpg' },
  { id: 5, username: 'cristianpontes2', sub: 'Cristian Pontes • Seguido(a) por gu_cardoso', avatar: '/sug5.jpg' },
];

export default function Suggestions() {
  const [following, setFollowing] = useState({});

  const toggleFollow = (id) => {
    setFollowing(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="right-sidebar">
      {/* Profile */}
      <div className="profile-row">
        <img
          className="profile-avatar"
          src="/perfil.jpg"
          alt="ariaxz.m"
          style={{
            borderRadius: '50%',
            width: 48,
            height: 48,
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <div className="profile-info">
          <div className="profile-username">ariaxz.m</div>
          <div className="profile-name" style={{ fontStyle: 'italic' }}>Ariane ✨</div>
        </div>
        <button className="profile-switch-btn">Mudar</button>
      </div>

      {/* Suggestions */}
      <div className="suggestions-header">
        <span className="suggestions-title">Sugestões para você</span>
        <button className="suggestions-see-all">Ver tudo</button>
      </div>

      {suggestions.map(s => (
        <div key={s.id} className="suggestion-item">
          <img
            className="suggestion-avatar"
            src={s.avatar}
            alt={s.username}
          />
          <div className="suggestion-info">
            <div className="suggestion-username">{s.username}</div>
            <div className="suggestion-sub">{s.sub}</div>
          </div>
          <button
            className="suggestion-follow-btn"
            onClick={() => toggleFollow(s.id)}
            style={{ color: following[s.id] ? '#a8a8a8' : '#7c9cff' }}
          >
            {following[s.id] ? 'Seguindo' : 'Seguir'}
          </button>
        </div>
      ))}

      {/* Footer */}
      <div className="footer-links">
        <span>Sobre · Ajuda · Imprensa · API · Carreiras · Privacidade · Termos · Localizações · Idioma</span>
      </div>
      <div className="footer-copy">© 2026 INSTAGRÃO</div>
    </aside>
  );
}
