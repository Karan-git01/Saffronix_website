import { Helmet } from "react-helmet-async";
import Hero from "../sections/Hero";
import ClientStrip from "../sections/ClientStrip";
import About from "../sections/About";
import Portfolio from "../sections/Portfolio";
import Services from "../sections/Services";
import Process from "../sections/Process";
import { Testimonials } from "../sections/Testimonials";
import Stats from "../sections/Stats";
import CaseStudy from "../sections/CaseStudy";
import Pricing from "../sections/Pricing";
import Faq from "../sections/Faq";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Saffronix — Web Design, Development & Motion</title>
        <meta
          name="description"
          content="Saffronix is an independent design studio helping founders and growing brands turn ideas into refined, high-performance websites."
        />
        <meta property="og:title" content="Saffronix — Web Design, Development & Motion" />
        <meta
          property="og:description"
          content="Saffronix is an independent design studio helping founders and growing brands turn ideas into refined, high-performance websites."
        />
      </Helmet>
      <main>
        <Hero />
        <ClientStrip />
        <About />
        <Portfolio/>
        <Services/>
        <Process/>
        <Testimonials/>
        <Stats/>
        <CaseStudy/>
        <Pricing/>
        <Faq/>
      </main>
    </>
  );
}