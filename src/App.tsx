import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
import { useTheme } from "./hooks/useTheme";
import { useScrollMorph } from "./hooks/useScrollMorph";

export default function App() {
  const { theme, toggle } = useTheme();
  useScrollMorph();
  return (
    <>
      <ScrollProgress />
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Nav theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
