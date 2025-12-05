import React from "react";
import { useRouter } from "next/router";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Services from "./Services";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Research from "./Research";
import Blog from "./Blog";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Hero
        onContactClick={() => {
          const contactElement = document.getElementById("contact");
          if (contactElement) {
            contactElement.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
      <Projects isPreview={true} onViewAll={() => router.push("/projects")} />
      <Services />
      <Research isPreview={true} onViewAll={() => router.push("/research")} />
      <Skills />
      <Experience />
      <Blog isPreview={true} onViewAll={() => router.push("/blog")} />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
};

export default Home;
