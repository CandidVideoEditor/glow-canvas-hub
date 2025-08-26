import React from 'react';
import ReactDOM from 'react-dom';
import MusicPlayer from './MusicPlayer';
import './index.css'; // Assuming you're using Tailwind CSS

function App() {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      {/* Other content */}
      <MusicPlayer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
