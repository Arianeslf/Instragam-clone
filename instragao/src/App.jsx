import React from 'react';
import Sidebar from './components/Sidebar';
import Stories from './components/Stories';
import Feed from './components/Feed';
import Suggestions from './components/Suggestions';
import MessageButton from './components/MessageButton';

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="center-column">
          <Stories />
          <Feed />
        </div>
        <Suggestions />
      </div>
      <MessageButton />
    </div>
  );
}
