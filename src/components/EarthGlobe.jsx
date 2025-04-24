import { useEffect, useRef } from 'react';

function EarthGlobe() {
  const earthRef = useRef(null);
  
  useEffect(() => {
    const earth = earthRef.current;
    if (!earth) return;

    const handleMouseMove = (e) => {
      const rect = earth.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateY = Math.min(Math.max(x / 10, -15), 15);
      const rotateX = Math.min(Math.max(-y / 10, -15), 15);

      earth.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    const handleMouseLeave = () => {
      earth.style.transform = 'rotateY(0deg) rotateX(0deg)';
      earth.style.animation = 'spin 20s linear infinite';
    };

    const handleMouseEnter = () => {
      earth.style.animation = 'none';
    };

    earth.addEventListener('mousemove', handleMouseMove);
    earth.addEventListener('mouseleave', handleMouseLeave);
    earth.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      earth.removeEventListener('mousemove', handleMouseMove);
      earth.removeEventListener('mouseleave', handleMouseLeave);
      earth.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[1400px] h-[1400px]">
        <div ref={earthRef} className="earth w-full h-full"></div>
      </div>
    </div>
  );
  
}  

export default EarthGlobe;
