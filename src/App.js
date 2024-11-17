import { useEffect, lazy, Suspense } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import "animate.css/animate.min.css";
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import './App.css';


// Lazy load Packages component
const Packages = lazy(() => import('./components/Packages'));

function App() {
  useEffect(() => {
    // Smooth scroll behavior for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Updated scroll spy functionality
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.App-header nav a');

    // Helper function to get the topmost visible section
    const getTopmostVisibleSection = (entries) => {
      let topmostSection = null;
      let minTop = Infinity;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect();
          if (rect.top < minTop) {
            minTop = rect.top;
            topmostSection = entry.target;
          }
        }
      });

      return topmostSection;
    };

    const observerOptions = {
      threshold: Array.from({ length: 11 }, (_, i) => i / 10), // Creates thresholds from 0 to 1
      rootMargin: '-10% 0px -10% 0px'
    };

    const observerCallback = (entries) => {
      const visibleSection = getTopmostVisibleSection(entries);
      
      if (visibleSection) {
        const activeId = visibleSection.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href').substring(1);
          link.classList.toggle('active', href === activeId);
        });
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="shagun/images/henna_logo.png" alt="SR Negi Mehendi Art Logo" className="logo animate__animated animate__fadeIn" />
        <nav className="animate__animated animate__slideInDown">
          <a href="#home">Home</a>
          <a href="#packages">Packages</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      
      <section id="home" className="hero-container">
        <div className="hero-image">
          <img src="shagun/images/wallpaper.jpg" alt="Mehendi Design Background" />
        </div>
      </section>
      
      <main className="main-content">
        <section id="packages">
          <AnimationOnScroll animateIn="animate__fadeIn" offset={50} initiallyVisible={true}>
            <Suspense fallback={<div className="loading-placeholder">Loading packages...</div>}>
              <Packages />
            </Suspense>
          </AnimationOnScroll>
        </section>
        
        <section id="gallery">

          <AnimationOnScroll animateIn="animate__fadeIn">
            <Gallery />
          </AnimationOnScroll>
        </section>
        
        <section id="contact">
          <AnimationOnScroll animateIn="animate__fadeIn">
            <Contact />
          </AnimationOnScroll>
        </section>
      </main>
    </div>
  );
}

export default App;
