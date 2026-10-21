import { useScrollY } from "./hooks/usePortfolioHooks";
import { Nav } from "./components/Nav";
import { Divider, Footer } from "./components/portfolio/Primitives";
import { Hero } from "./sections/Hero";
import { Marquee } from "./sections/Marquee";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { University } from "./sections/University";
import { ProjectDemos } from "./sections/ProjectDemos";
import { Projects } from "./sections/Projects";
import { GitHubActivity } from "./sections/GitHubActivity";
import { Contact } from "./sections/Contact";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/portfolio.css";

export default function Portfolio() {
  const scrollY = useScrollY();

  return (
    <>
      <Nav scrollY={scrollY} />
      <Hero />
      <Marquee />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <University />
      <Divider />
      <ProjectDemos />
      <Divider />
      <Projects />
      <Divider />
      <GitHubActivity />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
