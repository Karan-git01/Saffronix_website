import AboutHero from "../sections/AboutHero";
import AboutMission from "../sections/AboutMission";
import ClientStories from "../sections/ClientStories";
import ClientStrip from "../sections/ClientStrip";
import Footer from "../sections/Footer";
import Services from "../sections/Services";
import Stats from "../sections/Stats";

/**
 * About page — composes the three sections in order:
 * 1. AboutHero      (dark)  — "Design, Build & Launch" — carries its own
 *                              nav (Menu + wordmark + Start Project), so
 *                              no separate page header is needed here.
 * 2. AboutMission    (paper) — "A Clear Direction" / "My Mission"
 * 3. ClientStories   (paper) — "Client Stories" testimonials, specific to
 *                              this page — NOT the home page's Testimonials.
 */
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <ClientStrip/>
      <AboutMission />
      <Stats/>
      <Services/>
      <ClientStories />
      <Footer/>
    </main>
  );
}