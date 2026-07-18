import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import ProjectsSection from "./ProjectsSection";
import Skills from "./Skills";
import Experience from "./Experience";
import Publications from "./Publications";
import Contact from "./Contact";
import Footer from "./Footer";

/** Full single-page composition, shared by /, /ai and /backend. */
export default function Site() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <ProjectsSection />
        <Skills />
        <Experience />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
