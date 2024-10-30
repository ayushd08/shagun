import React, { useState, useEffect } from 'react';
import './Packages.css';

function Packages() {
  const packages = [
    {
      id: 1,
      name: "Basic Package",
      price: "₹3100",
      duration: "30 minutes",
      features: [
        "Single hand design",
        "Traditional patterns",
        "Basic customization",
        "Perfect for small events"
      ],
      images: [
        "/images/basic1.jpeg",
        "/images/basic2.jpeg",
        "/images/basic3.jpeg"
      ]
    },
    {
      id: 2,
      name: "Premium Package",
      price: "₹5100",
      duration: "1 hour",
      features: [
        "Both hands design",
        "Complex patterns",
        "Full customization",
        "Ideal for special occasions"
      ],
      images: [
        "/images/premium.jpeg"
    ]
    },
    {
      id: 3,
      name: "Bridal Package",
      price: "₹21000",
      duration: "3 hours",
      features: [
        "Full hands and feet design",
        "Intricate bridal patterns",
        "Premium customization",
        "Free touch-up service"
      ],
      images: [
        "/images/bridal.jpeg",
        "/images/bridal2.jpeg"
      ]
    }
  ];

  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    packages.map(() => 0)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) =>
        prevIndexes.map((currentIndex, pkgIndex) => 
          (currentIndex + 1) % packages[pkgIndex].images.length
        )
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [packages]);

  const handleBookNowClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="packages-section">
      <h2 className="packages-title">Our Packages</h2>
      <div className="packages-container">
        {packages.map((pkg, pkgIndex) => {
          return (
            <div key={pkg.id} className="package-card">
              <div className="package-image">
                {pkg.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={pkg.name}
                    className={`slide-image ${currentImageIndexes[pkgIndex] === imgIndex ? 'active' : ''}`}
                    style={{ objectFit: 'scale-down', width: '100%', height: '100%' }}
                  />
                ))}
              </div>
              <div className="package-content">
                <h3>{pkg.name}</h3>
                <p className="price">{pkg.price}</p>
                <p className="duration">Duration: {pkg.duration}</p>
                <ul className="features">
                  {pkg.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className="book-btn" 
                  onClick={handleBookNowClick}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Packages; 