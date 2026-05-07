import React, { useState, useEffect, useRef } from 'react';

export default function StoryModal({ stories, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [reply, setReply] = useState('');
  const intervalRef = useRef(null);

  const startProgress = () => {
    setProgress(0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          goNext();
          return 0;
        }
        return p + 1;
      });
    }, 50);
  };

  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    startProgress();
    return () => clearInterval(intervalRef.current);
  }, [current]);

  const goNext = () => {
    if (current < stories.length - 1) setCurrent(c => c + 1);
    else onClose();
  };

  const goPrev = () => {
    if (current > 0) setCurrent(c => c - 1);
  };

  const getOffset = (i) => i - current;

  return (
    <div className="sm-overlay" onClick={onClose}>
      {/* Botão fechar */}
      <button className="sm-close" onClick={onClose}>✕</button>

      {/* Seta esquerda */}
      <button className="sm-arrow sm-arrow-left" onClick={e => { e.stopPropagation(); goPrev(); }}>‹</button>

      {/* Stories em perspectiva */}
      <div className="sm-stage" onClick={e => e.stopPropagation()}>
        {stories.map((story, i) => {
          const offset = getOffset(i);
          if (Math.abs(offset) > 2) return null;

          const isCenter = offset === 0;
          const scale = isCenter ? 1 : 0.72;
          const translateX = offset * 340;
          const zIndex = isCenter ? 10 : 5 - Math.abs(offset);
          const opacity = Math.abs(offset) > 1 ? 0.5 : isCenter ? 1 : 0.8;
          const blur = isCenter ? 0 : Math.abs(offset) * 2;

          return (
            <div
              key={story.id}
              className={`sm-card ${isCenter ? 'sm-card-center' : ''}`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity,
                filter: `blur(${blur}px)`,
                cursor: isCenter ? 'default' : 'pointer',
              }}
              onClick={isCenter ? undefined : () => setCurrent(i)}
            >
              {/* Barra de progresso (só no central) */}
              {isCenter && (
                <div className="sm-progress-bar">
                  <div className="sm-progress-track">
                    <div className="sm-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="sm-header">
                <img className="sm-avatar" src={story.avatar} alt={story.username} />
                <div className="sm-user-info">
                  <span className="sm-username">{story.username}</span>
                  <span className="sm-time">2 h</span>
                </div>
                {isCenter && (
                  <>
                    <button className="sm-pause">⏸</button>
                    <button className="sm-dots">•••</button>
                  </>
                )}
              </div>

              {/* Imagem */}
              <img
                className="sm-img"
                src={story.avatar}
                alt={story.username}
              />

              {/* Footer só no central */}
              {isCenter && (
                <div className="sm-footer">
                  <div className="sm-reply-row">
                    <input
                      className="sm-reply-input"
                      placeholder={`Responder a ${story.username}...`}
                      value={reply}
                      onChange={e => setReply(e.target.value)}
                      onClick={e => e.stopPropagation()}
                    />
                    <button className="sm-foot-btn" title="Curtir">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <button className="sm-foot-btn" title="Compartilhar">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Seta direita */}
      <button className="sm-arrow sm-arrow-right" onClick={e => { e.stopPropagation(); goNext(); }}>›</button>
    </div>
  );
}
