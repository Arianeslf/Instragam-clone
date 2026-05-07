import React, { useState } from 'react';

const msgContacts = [
  { id: 1, name: 'coisas q Ari provavelmente cutiria', avatar: '/msg_ari1.jpg', avatar2: '/msg_ari2.jpg', preview: 'Você enviou um anexo. · 21 h', unread: false },
  { id: 2, name: 'Dayani Lima',        avatar: '/msg4.jpg', preview: 'Você enviou um anexo. · 1 d',              unread: false },
  { id: 3, name: 'Carla Stefani ★',   avatar: '/msg6.jpg', preview: 'Você enviou um anexo. · 2 sem',            unread: false },
  { id: 4, name: 'Jonatas Muniz RB',   avatar: '/msg8.jpg', preview: 'Reagiu com 😆 à sua mensagem · 1 h',      unread: true  },
];

const BADGE = 9;

export default function MessageButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="message-btn-fixed">
      {open && (
        <div className="message-panel">
          <div className="message-panel-header">
            Mensagens
            {BADGE > 0 && <span className="message-btn-badge">{BADGE}+</span>}
            <div style={{ flex: 1 }} />
            <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', color:'#fff', fontSize:20, cursor:'pointer' }}>✕</button>
          </div>
          <div className="message-panel-list">
            {msgContacts.map(c => (
              <div key={c.id} className="message-panel-item">
                <div style={{ position:'relative', flexShrink:0, width:44, height:44 }}>
                  {c.avatar2 ? (
                    <>
                      <img src={c.avatar2} alt="" style={{ position:'absolute', bottom:0, right:0, width:30, height:30, borderRadius:'50%', objectFit:'cover', border:'2px solid #1a1a1a', zIndex:2 }} />
                      <img src={c.avatar} alt="" style={{ position:'absolute', top:0, left:0, width:30, height:30, borderRadius:'50%', objectFit:'cover', border:'2px solid #1a1a1a', zIndex:1 }} />
                    </>
                  ) : (
                    <img className="message-panel-avatar" src={c.avatar} alt={c.name} />
                  )}
                  {c.unread && (
                    <span style={{
                      position:'absolute', bottom:0, right:0,
                      width:12, height:12, borderRadius:'50%',
                      background:'#0095f6', border:'2px solid #1a1a1a', zIndex:3
                    }} />
                  )}
                </div>
                <div className="message-panel-info">
                  <div className="message-panel-name" style={{ fontWeight: c.unread ? 700 : 500 }}>{c.name}</div>
                  <div className="message-panel-preview" style={{ fontWeight: c.unread ? 600 : 400, color: c.unread ? '#fff' : '#a8a8a8' }}>{c.preview}</div>
                </div>
              </div>
            ))}
          </div>
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
