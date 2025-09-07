import { useEffect } from 'react';
import MusicContainer from './MusicContainer';
import './styles.css';

export function App() {
  useEffect(() => {
    function isCssLoaded(sheetHref: string) {
      const sheets = document.styleSheets;
      for (let i = 0; i < sheets.length; i++) {
        const sheet = sheets[i];
        if (sheet.href && sheet.href.includes(sheetHref)) {
          return true;
        }
      }
      return false;
    }

    if (!isCssLoaded('tailwind.css')) {
      const style = document.createElement('style');
      style.textContent = `
      /* Minimal fallback Tailwind CSS styles */
      body { font-family: system-ui, sans-serif; background-color: #fff; }
      .text-center { text-align: center; }
      .bg-black { background-color: black; }
    `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div>
      <MusicContainer role="user" />
    </div>
  );
}

export default App;
