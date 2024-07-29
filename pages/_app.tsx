// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DarkModeProvider } from "../contexts/DarkModeContext";
import RootLayout from "../components/RootLayout";

// Custom App component to initialize pages
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Provide Dark Mode context to the entire app
    <DarkModeProvider>
      {/* Layout component to manage global layout aspects */}
      <RootLayout>
        {/* Render the specific page component with its props */}
        <Component {...pageProps} />
      </RootLayout>
    </DarkModeProvider>
  );
}

export default MyApp;
