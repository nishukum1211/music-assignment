import { useEffect } from 'react';
import MusicContainer from './MusicContainer';
import './styles.css';

export function App() {
  return (
    <div className="bg-black">
      <MusicContainer role="user" />
    </div>
  );
}

export default App;
