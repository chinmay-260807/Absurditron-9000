import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

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
      <div style="padding: 2rem; font-family: sans-serif; text-align: center;">
        <h1 style="color: red;">Logic Engine Failure</h1>
        <p>The Absurditron 9000 encountered a reality glitch.</p>
        <pre style="background: #eee; padding: 1rem; text-align: left; display: inline-block;">${error.message}</pre>
        <br/><br/>
        <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; cursor: pointer;">Reboot Reality</button>
      </div>
    `;
  }
} else {
  console.error("Target container #root not found.");
}