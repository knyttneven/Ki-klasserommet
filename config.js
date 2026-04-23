export const CONFIG = {
  ADMIN_PIN: "2030",
  fogUnlockAt: 3,
  copilotUrl: "https://copilot.microsoft.com",
  siteName: "KI i klasserommet",
  siteSubtitle: "Praktiske prompt-kort for lærere i videregående",
  kontakt: "",

  // Supabase feature flags — all disabled until explicitly activated
  adminDeleteUrl: "", // URL to deployed backend/admin-delete.js endpoint

  supabase: {
    enableRead: false,       // D1.2: les brukerdata fra Supabase
    enableWrite: false,      // D1.3: skriv brukerdata til Supabase
    enableProgression: false // D1.4: progresjon og tilstand via Supabase
  }
};
