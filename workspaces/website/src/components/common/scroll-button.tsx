"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToNextSection = () => {
    const sections = document.querySelectorAll("section");
    const currentSection = document
      .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      ?.closest("section");

    if (currentSection) {
      const currentIndex = Array.from(sections).indexOf(currentSection);
      const nextSection = sections[currentIndex + 1];

      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hide button when near the bottom of the page
      setIsVisible(scrollPosition < documentHeight - windowHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToNextSection}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:opacity-80 transition-opacity"
      aria-label="Scroll to next section"
    >
      <ArrowDown className="h-6 w-6 text-cyan-400" />
    </button>
  );
};

export default ScrollButton;
