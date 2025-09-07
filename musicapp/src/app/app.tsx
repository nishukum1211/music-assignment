import { useEffect } from 'react';
import MusicContainer from './MusicContainer';
import './styles.css';

export function App() {
  return (
    <div className="bg-black h-[100vh]">
      <MusicContainer role="user" />
    </div>
  );
}

export default App;
