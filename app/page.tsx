import Navbar from "../components/Navbar"; // 1. Import the Navbar
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Divider from "@/components/Divider";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="relative z-9">
      <InteractiveBackground />
      </div>
      <div className="relative z-10">
      <Navbar /> {/* 2. Snap it onto the very top */}
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
      </div>
    </main>
  );
}