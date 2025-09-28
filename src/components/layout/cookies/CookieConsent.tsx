"use client";

import { useEffect, useState } from "react";

export const COOKIE_KEY = process.env.COOKIE_KEY ?? "";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
    window.location.reload();
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, "false");
    setVisible(false);
    window.location.reload();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-yellow-pastel border-t border-t-gold-pastel p-4 shadow">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-base text-text-primary">
          Utilizamos cookies para analizar el tráfico y mejorar su experiencia.
          Al hacer clic en "Aceptar", usted acepta nuestro uso de Google
          Analytics.
        </p>
        <div className="flex gap-2">
          <button onClick={handleReject} className="btn-default">
            Rechazar
          </button>
          <button onClick={handleAccept} className="btn-primary">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
