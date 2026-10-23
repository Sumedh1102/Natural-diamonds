/**
 * Stylised, not-to-scale cross-section: diamonds form deep in the mantle and
 * are carried up a kimberlite pipe to the surface, where they are mined.
 * Numbered markers correspond to the steps beside it.
 */
export function EarthCrossSection({ className }: { className?: string }) {
  // Terraced open pit at the top of the pipe
  const pit = "M120 96 L140 96 L146 104 L160 104 L166 112 L178 112 L184 120 L216 120 L222 112 L234 112 L240 104 L254 104 L260 96 L280 96";
  const diamonds = [
    [168, 548], [196, 566], [226, 552], [150, 572], [244, 574], [208, 538], [182, 586], [232, 594], [126, 560], [272, 556],
  ];
  const markers = [
    { n: "01", x: 300, y: 562 },
    { n: "02", x: 262, y: 360 },
    { n: "03", x: 296, y: 104 },
    { n: "04", x: 92, y: 74 },
  ];

  return (
    <svg
      viewBox="0 0 400 660"
      role="img"
      aria-labelledby="cross-section-title cross-section-desc"
      className={className}
    >
      <title id="cross-section-title">From the mantle to the surface</title>
      <desc id="cross-section-desc">
        A simplified cross-section of the Earth. Diamonds form 150 to 200 kilometres below the surface and are carried
        upward through a carrot-shaped kimberlite pipe to an open-pit mine at the surface.
      </desc>
      <defs>
        <linearGradient id="xs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2622" />
          <stop offset="1" stopColor="#6b5139" />
        </linearGradient>
        <linearGradient id="xs-mantle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2420" />
          <stop offset="0.55" stopColor="#3a2418" />
          <stop offset="1" stopColor="#4a2414" />
        </linearGradient>
        <linearGradient id="xs-pipe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d6670" />
          <stop offset="0.6" stopColor="#4c5560" />
          <stop offset="1" stopColor="#b88a6a" />
        </linearGradient>
        <radialGradient id="xs-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e3c7a5" stopOpacity="0.45" />
          <stop offset="1" stopColor="#e3c7a5" stopOpacity="0" />
        </radialGradient>
        <pattern id="xs-grain" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="#ffffff" opacity="0.06" />
          <circle cx="4" cy="4" r="0.5" fill="#000000" opacity="0.18" />
        </pattern>
      </defs>

      {/* Sky and horizon */}
      <rect x="0" y="0" width="400" height="96" fill="url(#xs-sky)" />
      {/* Crust strata */}
      <rect x="0" y="96" width="400" height="44" fill="#8f6c54" />
      <rect x="0" y="140" width="400" height="40" fill="#a57b5a" />
      <rect x="0" y="180" width="400" height="36" fill="#7a6a60" />
      <rect x="0" y="216" width="400" height="34" fill="#946f57" />
      {/* Mantle */}
      <rect x="0" y="250" width="400" height="410" fill="url(#xs-mantle)" />
      <rect x="0" y="96" width="400" height="564" fill="url(#xs-grain)" />

      {/* Diamond stability zone */}
      <rect x="0" y="520" width="400" height="92" fill="#b88a6a" opacity="0.08" />
      <line x1="0" y1="520" x2="400" y2="520" stroke="#b88a6a" strokeOpacity="0.45" strokeDasharray="3 5" />
      <line x1="0" y1="612" x2="400" y2="612" stroke="#b88a6a" strokeOpacity="0.45" strokeDasharray="3 5" />

      {/* Kimberlite pipe */}
      <path d="M128 96 C150 220 182 360 192 520 L196 600 L204 600 L208 520 C218 360 250 220 272 96 Z" fill="url(#xs-pipe)" opacity="0.92" />
      <path d="M128 96 C150 220 182 360 192 520 L196 600" fill="none" stroke="#e3c7a5" strokeOpacity="0.35" />
      <path d="M272 96 C250 220 218 360 208 520 L204 600" fill="none" stroke="#e3c7a5" strokeOpacity="0.35" />

      {/* Open pit */}
      <path d={`${pit} L280 96 L120 96 Z`} fill="#1a1a1a" />
      <path d={pit} fill="none" stroke="#d9b592" strokeWidth="1.5" />
      <line x1="0" y1="96" x2="120" y2="96" stroke="#d9b592" strokeOpacity="0.6" />
      <line x1="280" y1="96" x2="400" y2="96" stroke="#d9b592" strokeOpacity="0.6" />

      {/* Diamonds forming at depth */}
      <ellipse cx="200" cy="566" rx="120" ry="44" fill="url(#xs-glow)" />
      {diamonds.map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y - 6} L${x + 5} ${y} L${x} ${y + 6} L${x - 5} ${y} Z`} fill="#f7e7ce" opacity="0.9" />
      ))}
      {/* A few diamonds travelling up the pipe */}
      {[
        [200, 440],
        [196, 330],
        [204, 230],
      ].map(([x, y]) => (
        <path key={`up-${y}`} d={`M${x} ${y - 4} L${x + 3.5} ${y} L${x} ${y + 4} L${x - 3.5} ${y} Z`} fill="#f7e7ce" opacity="0.75" />
      ))}
      <path d="M200 500 L200 140" stroke="#f7e7ce" strokeOpacity="0.25" strokeDasharray="2 6" />

      {/* Depth labels */}
      <g fill="#ffffff" fontFamily="var(--font-jost), sans-serif" fontSize="10" letterSpacing="1.6">
        <text x="12" y="88" opacity="0.7">SURFACE</text>
        <text x="12" y="244" opacity="0.6">CRUST</text>
        <text x="12" y="274" opacity="0.6">MANTLE</text>
        <text x="12" y="512" fill="#e3c7a5">150–200 KM</text>
        <text x="12" y="640" opacity="0.45">NOT TO SCALE</text>
      </g>

      {/* Step markers */}
      {markers.map((marker) => (
        <g key={marker.n}>
          <circle cx={marker.x} cy={marker.y} r="15" fill="#111111" stroke="#b88a6a" />
          <text
            x={marker.x}
            y={marker.y + 3.5}
            textAnchor="middle"
            fill="#e3c7a5"
            fontFamily="var(--font-jost), sans-serif"
            fontSize="10"
            letterSpacing="1"
          >
            {marker.n}
          </text>
        </g>
      ))}
    </svg>
  );
}
