import React, { useState, useRef } from 'react';

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "#e0245e" : "none"} stroke={filled ? "#e0245e" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

export default function Post({ post }) {
  const [liked, setLiked] = useState(post.liked || false);
  const [likes, setLikes] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [heartVisible, setHeartVisible] = useState(false);

  const tapTimer = useRef(null);
  const images = post.images || (post.image ? [post.image] : null);
  const isCarousel = images && images.length > 1;

  const handleLike = () => {
    if (liked) { setLiked(false); setLikes(l => l - 1); }
    else { setLiked(true); setLikes(l => l + 1); }
  };

  // Double-tap / double-click na imagem
  const handleImageClick = () => {
    if (tapTimer.current) {
      // segundo clique — é double tap
      clearTimeout(tapTimer.current);
      tapTimer.current = null;
      if (!liked) {
        setLiked(true);
        setLikes(l => l + 1);
      }
      // mostra o coração animado
      setHeartVisible(true);
      setTimeout(() => setHeartVisible(false), 900);
    } else {
      tapTimer.current = setTimeout(() => {
        tapTimer.current = null;
        // single click — não faz nada na imagem
      }, 280);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments(prev => [...prev, { user: 'ariaxz.m', text: comment.trim() }]);
    setComment('');
    setShowComments(true);
  };

  const prevSlide = (e) => { e.stopPropagation(); setCarouselIndex(i => Math.max(0, i - 1)); };
  const nextSlide = (e) => { e.stopPropagation(); setCarouselIndex(i => Math.min(images.length - 1, i + 1)); };

  return (
    <article className="post">
      {/* Header */}
      <div className="post-header">
        <div className="post-avatar-wrap">
          <img className="post-avatar" src={post.avatar} alt={post.username} />
        </div>
        <div className="post-meta">
          <div className="post-username">{post.username}</div>
          <div className="post-time">{post.location ? `${post.time} · ${post.location}` : post.time}</div>
        </div>
        <button className="post-dots" title="Mais opções">•••</button>
      </div>

      {/* Image / Carousel */}
      <div
        className="post-image-wrap"
        style={{ position: 'relative' }}
        onClick={images ? handleImageClick : undefined}
      >
        {images ? (
          <>
            <img
              className="post-image"
              src={images[carouselIndex]}
              alt={`${post.username} ${carouselIndex + 1}`}
              draggable={false}
            />

            {/* Coração animado do double-tap */}
            {heartVisible && (
              <div className="double-tap-heart">
                <svg viewBox="0 0 24 24" fill="#fff" width="90" height="90">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
            )}

            {/* Botões prev/next */}
            {isCarousel && carouselIndex > 0 && (
              <button onClick={prevSlide} className="carousel-btn carousel-btn-prev">‹</button>
            )}
            {isCarousel && carouselIndex < images.length - 1 && (
              <button onClick={nextSlide} className="carousel-btn carousel-btn-next">›</button>
            )}
            {/* Bolinhas */}
            {isCarousel && (
              <div className="carousel-dots">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`carousel-dot${i === carouselIndex ? ' active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setCarouselIndex(i); }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div
            className="post-image-emoji"
            style={{ background: post.bg || '#1a1a1a', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '90px' }}
          >
            {post.emoji}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button className={`post-action-btn${liked ? ' liked' : ''}`} onClick={handleLike} title="Curtir">
            <HeartIcon filled={liked} />
            <span className="post-action-count">{likes.toLocaleString('pt-BR')}</span>
          </button>
          <button className="post-action-btn" title="Comentar" onClick={() => setShowComments(s => !s)}>
            <CommentIcon />
            <span className="post-action-count">{comments.length}</span>
          </button>
          <button className="post-action-btn" title="Repostar">
            <RepeatIcon />
            <span className="post-action-count">{post.reposts || 0}</span>
          </button>
          <button className="post-action-btn" title="Enviar">
            <SendIcon />
          </button>
        </div>
        <button
          className={`post-action-btn post-save${saved ? ' saved' : ''}`}
          onClick={() => setSaved(s => !s)} title="Salvar"
        >
          <BookmarkIcon filled={saved} />
        </button>
      </div>

      {/* Caption */}
      <div className="post-caption">
        <strong>{post.username}</strong>
        {post.caption && post.caption.split('\n').map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}
      </div>

      {/* Comments toggle */}
      {comments.length > 0 && (
        <button className="post-see-comments" onClick={() => setShowComments(s => !s)}>
          {showComments ? 'Ocultar comentários' : `Ver todos os ${comments.length} comentários`}
        </button>
      )}

      {/* Comments */}
      {showComments && (
        <div className="post-comments-list">
          {comments.map((c, i) => (
            <div key={i} className="post-comment">
              <strong>{c.user}</strong>{c.text}
            </div>
          ))}
        </div>
      )}

      {/* Add comment */}
      <div className="post-comment-input-row">
        <input
          className="post-comment-input"
          placeholder="Adicione um comentário..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleComment(e); }}
        />
        <button className="post-comment-submit" onClick={handleComment} disabled={!comment.trim()}>
          Publicar
        </button>
      </div>
    </article>
  );
}