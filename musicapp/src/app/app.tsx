import { useEffect } from 'react';
import MusicContainer from './MusicContainer';
import './styles.css';

export function App() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <MusicContainer role="user" />
    </div>
  );
}

export default App;
