
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Polyfill for environments that might not have window.process set correctly in modules
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: { API_KEY: '' } };
}

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical rendering error:", error);
    rootElement.innerHTML = `
      <div style="padding: 2rem; font-family: sans-serif; text-align: center; background: #f0f0f0; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="color: black; font-weight: 900; font-size: 3rem; margin-bottom: 1rem;">LOGIC ENGINE FAILURE</h1>
        <p style="font-size: 1.2rem; color: #444; margin-bottom: 2rem;">The Absurditron 9000 encountered a reality glitch.</p>
        <div style="background: #fff; border: 4px solid black; box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); padding: 1.5rem; text-align: left; max-width: 600px; width: 100%;">
          <pre style="white-space: pre-wrap; word-break: break-all; margin: 0; font-family: monospace; font-size: 0.9rem;">${error instanceof Error ? error.message : String(error)}</pre>
        </div>
        <button onclick="window.location.reload()" style="margin-top: 2rem; background: #ff0055; color: white; border: 4px solid black; padding: 1rem 2rem; font-weight: 900; cursor: pointer; box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);">REBOOT REALITY</button>
      </div>
    `;
  }
}
