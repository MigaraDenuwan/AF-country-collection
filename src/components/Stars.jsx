import { useEffect } from 'react';

function Stars() {
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.querySelector('.stars-bg');
      if (!starsContainer) return;
      
      // Clear existing stars
      starsContainer.innerHTML = '';
      
      // Create new stars
      const count = Math.floor(window.innerWidth * window.innerHeight / 1000);
      
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random opacity and animation delay
        star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
      }
    };

    createStars();
    
    // Recreate stars on window resize
    window.addEventListener('resize', createStars);
    
    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, []);

  return <div className="stars-bg"></div>;
}

export default Stars;