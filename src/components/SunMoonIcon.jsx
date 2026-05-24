import React from 'react';

/**
 * SunMoonIcon renders a custom Neo-Brutalist style SVG for either the Sun or Moon.
 * It includes decorative elements (rays, sparkles, stars) and animations.
 * 
 * @param {Object} props
 * @param {boolean} props.isDay - Whether it's currently day time (sunrise to sunset)
 * @param {string} props.size - Size class for the icon wrapper
 */
export const SunMoonIcon = ({ isDay, size = "w-24 h-24" }) => {
  if (isDay) {
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full anim-pulse-ray"
        style={{ overflow: 'visible' }}
      >
        {/* Sun rays */}
        <g stroke="#000" strokeWidth="3" fill="#ff6b00">
          <rect x="45" y="5" width="10" height="20" rx="2" transform="rotate(0 50 50)" />
          <rect x="45" y="5" width="10" height="20" rx="2" transform="rotate(45 50 50)" fill="#ff007f" />
          <rect x="45" y="5" width="10" height="20" rx="2" transform="rotate(90 50 50)" />
          <rect x="45" y="5" width="10" height="20" rx="2" transform="rotate(135 50 50)" fill="#ff007f" />
          <rect x="45" y="5" width="10" height="20" rx="2" transform="rotate(180 50 50)" />
          <rect x="45" y="5" width="10" height="20" rx="2" transform="rotate(225 50 50)" fill="#ff007f" />
          <rect x="45" y="5" width="10" height="20" rx="2" transform="rotate(270 50 50)" />
          <rect x="45" y="5" width="10" height="20" rx="2" transform="rotate(315 50 50)" fill="#ff007f" />
        </g>
        
        {/* Core Sun body */}
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="#fcf634"
          stroke="#000"
          strokeWidth="4"
        />

        {/* Neo-brutalist sunglasses / face */}
        {/* Sunglasses frame */}
        <rect x="30" y="42" width="40" height="10" fill="#000" rx="2" />
        {/* Left lens highlights */}
        <polygon points="34,44 38,44 36,48" fill="#fff" />
        {/* Right lens highlights */}
        <polygon points="54,44 58,44 56,48" fill="#fff" />
        {/* Sunglasses bridge */}
        <rect x="46" y="44" width="8" height="3" fill="#000" />
        {/* Smile */}
        <path d="M 44 58 Q 50 63 56 58" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  } else {
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full anim-float-crescent"
        style={{ overflow: 'visible' }}
      >
        {/* Sparkles / Stars in background */}
        <g fill="#02fdfd" stroke="#000" strokeWidth="2">
          {/* Star 1 */}
          <polygon points="20,20 22,25 27,25 23,28 25,33 20,30 15,33 17,28 13,25 18,25" />
          {/* Star 2 */}
          <polygon points="80,70 82,73 85,73 82,75 83,78 80,76 77,78 78,75 75,73 78,73" transform="scale(0.8) translate(20, 10)" />
          {/* Star 3 (cross star) */}
          <path d="M 75 25 L 75 35 M 70 30 L 80 30" stroke="#000" strokeWidth="3" strokeLinecap="square" />
        </g>

        {/* Crescent Moon */}
        <path
          d="M 60 20 A 32 32 0 1 0 60 80 A 24 24 0 1 1 60 20 Z"
          fill="#bd93f9"
          stroke="#000"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Sleepy Moon Face */}
        {/* Sleepy Eye */}
        <path d="M 28 48 Q 33 53 38 48" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <path d="M 31 50 L 30 53" stroke="#000" strokeWidth="2.5" />
        <path d="M 35 50 L 36 53" stroke="#000" strokeWidth="2.5" />
        
        {/* Cheek pink bubble */}
        <circle cx="28" cy="56" r="3.5" fill="#fe019a" stroke="#000" strokeWidth="1.5" />
        {/* Smile */}
        <path d="M 36 57 Q 39 59 41 56" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
};
