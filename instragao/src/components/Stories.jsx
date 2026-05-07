import React, { useState, useRef } from 'react';
import StoryModal from './StoryModal';

const storiesData = [
  { id: 1,  username: 'baka.y0l',       avatar: '/st1.jpg',  seen: false },
  { id: 2,  username: 'instituto.p...',  avatar: '/st2.jpg',  seen: false },
  { id: 3,  username: '_aryelmart...',   avatar: '/st3.jpg',  seen: false },
  { id: 4,  username: 'gu_cardos...',    avatar: '/st4.jpg',  seen: false },
  { id: 5,  username: 'the_spider...',   avatar: '/st5.jpg',  seen: false },
  { id: 6,  username: 'willy_marq...',   avatar: '/st6.jpg',  seen: false },
  { id: 7,  username: 'jhennifer bi...', avatar: '/st7.jpg',  seen: false },
  { id: 8,  username: 'r.e.e.h_m.d.s',  avatar: '/st8.jpg',  seen: false },
  { id: 9,  username: 'prof_rafaa...',   avatar: '/st9.jpg',  seen: false },
  { id: 10, username: 'nyco.b612',       avatar: '/st10.jpg', seen: true  },
  { id: 11, username: 'mac_scarv...',    avatar: '/st11.jpg', seen: true  },
  { id: 12, username: 'pertty_gihh',     avatar: '/st12.jpg', seen: true  },
  { id: 13, username: 'im_arthur_...',   avatar: '/st13.jpg', seen: true  },
  { id: 14, username: 'elves_ink',       avatar: '/st14.jpg', seen: true  },
  { id: 15, username: 'dell_qsp',        avatar: '/st_dell.jpg', seen: false },
  { id: 16, username: 'ymra_seag...',    avatar: '/st_ymra.jpg', seen: false },
];

export default function Stories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const scrollRef = useRef(null);

  const openStory = (index) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' });
    }
  };

  return (
    <div className="stories-wrapper">
      <div className="stories-scroll" ref={scrollRef} onWheel={handleWheel}>
        {storiesData.map((story, i) => (
          <div key={story.id} className="story-item" onClick={() => openStory(i)}>
            <div className={`story-ring ${story.seen ? 'seen' : ''}`}>
              <div className="story-img-wrap">
                <img className="story-img" src={story.avatar} alt={story.username} />
              </div>
            </div>
            <span className="story-name">{story.username}</span>
          </div>
        ))}
      </div>
      <button className="stories-arrow" onClick={scrollRight}>›</button>

      {modalOpen && (
        <StoryModal
          stories={storiesData}
          initialIndex={modalIndex}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
