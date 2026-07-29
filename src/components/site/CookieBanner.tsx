import { useEffect, useState } from "react";

const STORAGE_KEY = "flair-avenue-cookie";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage non disponibile */
    }
  }, []);

  const decide = (choice: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage non disponibile */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="min-w-0">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Usiamo i cookie per migliorare la tua esperienza di acquisto e per analisi anonime.
            {prefs && (
              <span className="mt-2 block text-xs">
                Cookie tecnici sempre attivi · Cookie di analisi · Cookie di marketing
              </span>
            )}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPrefs((v) => !v)}
            className="label-wide border border-border px-5 py-3"
          >
            Preferenze
          </button>
          <button
            type="button"
            onClick={() => decide("rifiutato")}
            className="label-wide border border-border px-5 py-3"
          >
            Rifiuta
          </button>
          <button
            type="button"
            onClick={() => decide("accettato")}
            className="label-wide bg-primary px-5 py-3 text-primary-foreground"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
