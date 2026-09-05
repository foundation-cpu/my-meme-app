'use client';

import { useEffect, useState } from 'react';
import { init, webApp } from '@tma.js/sdk-react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      init();
      if (webApp.isSupported()) {
        webApp.expand();
      }
      setIsLoaded(true);
    } catch (e) {
      console.error('Failed to initialize Telegram WebApp SDK:', e);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-950 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">🚀 Meme Nonbank</h1>
        <p className="text-slate-400">
          {isLoaded ? 'Telegram Mini App initialized!' : 'Loading inside Telegram...'}
        </p>
      </div>
    </main>
  );
}
