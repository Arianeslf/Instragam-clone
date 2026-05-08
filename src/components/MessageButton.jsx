import React, { useState, useRef, useEffect } from 'react';

const msgContacts = [
  { id: 1, name: 'coisas q Ari provavelmente cutiria', avatar: '/msg_ari1.jpg', avatar2: '/msg_ari2.jpg', preview: 'Você enviou um anexo. · 21 h', unread: false },
  { id: 2, name: 'Dayani Lima',       avatar: '/msg4.jpg', preview: 'Você enviou um anexo. · 1 d',           unread: false },
  { id: 3, name: 'Carla Stefani ★',  avatar: '/msg6.jpg', preview: 'Você enviou um anexo. · 2 sem',         unread: false },
  { id: 4, name: 'Jonatas Muniz RB',  avatar: '/msg8.jpg', preview: 'Reagiu com 😆 à sua mensagem · 1 h',   unread: true  },
];

const BADGE = 9;

export default function MessageButton() {
  const [open, setOpen]             = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats]           = useState({});
  const [input, setInput]           = useState('');
  const bottomRef                   = useRef(null);
  const inputRef                    = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChat]);

  useEffect(() => {
    if (activeChat && inputRef.current) inputRef.current.focus();
  }, [activeChat]);

  const openChat = (contact) => {
    setActiveChat(contact);
    setChats(prev => prev[contact.id] ? prev : { ...prev, [contact.id]: [] });
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || !activeChat) return;
    setChats(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), { from: 'me', text }],
    }));
    setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const messages = activeChat ? (chats[activeChat.id] || []) : [];

  return (
    <div className="message-btn-fixed">
      {open && (
        <div className="message-panel">

          {/* ====== TELA DE CHAT ====== */}
          {activeChat ? (
            <>
              {/* Header estilo DM do Instagram */}
              <div className="mc-header">
                <button className="mc-back" onClick={() => setActiveChat(null)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <img className="mc-header-avatar" src={activeChat.avatar} alt={activeChat.name} />
                <div className="mc-header-info">
                  <span className="mc-header-name">{activeChat.name}</span>
                </div>
                <button className="mc-icon-btn" title="Expandir">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                </button>
                <button className="mc-icon-btn mc-close" onClick={() => setOpen(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Faixa "Sem conexão" (decorativa) */}
              <div className="mc-offline-bar">Sem conexão com a internet</div>

              {/* Corpo das mensagens */}
              <div className="mc-body">
                {messages.length === 0 && (
                  <div className="mc-empty">Nenhuma mensagem ainda.<br/>Diga olá! 👋</div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`mc-row ${msg.from === 'me' ? 'mc-row-me' : 'mc-row-them'}`}>
                    {msg.from !== 'me' && (
                      <img className="mc-bubble-avatar" src={activeChat.avatar} alt="" />
                    )}
                    <div className={`mc-bubble ${msg.from === 'me' ? 'mc-bubble-me' : 'mc-bubble-them'}`}>
                      {msg.text}
                    </div>
                    {msg.from === 'me' && (
                      <div className="mc-reaction-btns">
                        <button className="mc-react-btn" title="Reagir">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                        </button>
                        <button className="mc-react-btn" title="Responder">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Barra de input estilo Instagram DM */}
              <div className="mc-input-bar">
                <button className="mc-input-icon" title="Emoji">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </button>
                <input
                  ref={inputRef}
                  className="mc-input"
                  placeholder="Mensagem..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                />
                {input.trim() ? (
                  <button className="mc-send-text" onClick={sendMessage}>Enviar</button>
                ) : (
                  <>
                    <button className="mc-input-icon" title="Áudio">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                    </button>
                    <button className="mc-input-icon" title="Galeria">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </button>
                    <button className="mc-input-icon" title="Sticker">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2a10 10 0 0 1 10 10c0 2.5-.9 5.1-2.9 7.1L12 22H2V12C2 6.5 6.5 2 12 2z"/><circle cx="8.5" cy="9.5" r="1"/><circle cx="15.5" cy="9.5" r="1"/><path d="M8.5 14s1 1.5 3.5 1.5 3.5-1.5 3.5-1.5"/></svg>
                    </button>
                  </>
                )}
              </div>
            </>

          ) : (
          /* ====== LISTA DE CONTATOS ====== */
            <>
              <div className="message-panel-header">
                Mensagens
                {BADGE > 0 && <span className="message-btn-badge">{BADGE}+</span>}
                <div style={{ flex: 1 }} />
                <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', color:'#fff', fontSize:20, cursor:'pointer' }}>✕</button>
              </div>
              <div className="message-panel-list">
                {msgContacts.map(c => (
                  <div key={c.id} className="message-panel-item" onClick={() => openChat(c)}>
                    <div style={{ position:'relative', flexShrink:0, width:44, height:44 }}>
                      {c.avatar2 ? (
                        <>
                          <img src={c.avatar2} alt="" style={{ position:'absolute', bottom:0, right:0, width:30, height:30, borderRadius:'50%', objectFit:'cover', border:'2px solid #1a1a1a', zIndex:2 }} />
                          <img src={c.avatar}  alt="" style={{ position:'absolute', top:0,    left:0,  width:30, height:30, borderRadius:'50%', objectFit:'cover', border:'2px solid #1a1a1a', zIndex:1 }} />
                        </>
                      ) : (
                        <img className="message-panel-avatar" src={c.avatar} alt={c.name} />
                      )}
                      {c.unread && (
                        <span style={{ position:'absolute', bottom:0, right:0, width:12, height:12, borderRadius:'50%', background:'#0095f6', border:'2px solid #1a1a1a', zIndex:3 }} />
                      )}
                    </div>
                    <div className="message-panel-info">
                      <div className="message-panel-name" style={{ fontWeight: c.unread ? 700 : 500 }}>{c.name}</div>
                      <div className="message-panel-preview" style={{ fontWeight: c.unread ? 600 : 400, color: c.unread ? '#fff' : '#a8a8a8' }}>
                        {chats[c.id]?.length ? chats[c.id][chats[c.id].length - 1].text : c.preview}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <button className="message-btn" onClick={() => setOpen(o => !o)}>
        <img src="/logo-instragao.svg" alt="msg" style={{ width:20, height:20, filter:'invert(1)', flexShrink:0 }} />
        {BADGE > 0 && <span className="message-btn-badge">{BADGE}+</span>}
        <span>Mensagens</span>
        <div className="message-btn-avatars">
          {msgContacts.slice(0,3).map(c => (
            <img key={c.id} src={c.avatar} alt={c.name} />
          ))}
        </div>
        <span className="message-btn-dots">···</span>
      </button>
    </div>
  );
}