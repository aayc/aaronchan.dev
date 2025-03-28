import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import mixpanelTracker from "../utils/mixpanel";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Track page view on initial load
    mixpanelTracker.trackPageView(router.pathname);

    // Track page view on route change
    const handleRouteChange = (url: string) => {
      mixpanelTracker.trackPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
