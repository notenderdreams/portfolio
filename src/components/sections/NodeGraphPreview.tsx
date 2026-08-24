import React, { useEffect, useState } from 'react';

interface NodeGraphPreviewProps {
  embedded?: boolean;
}

export const NodeGraphPreview: React.FC<NodeGraphPreviewProps> = ({ embedded = false }) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return (
    <section
      className={`node-graph-section${embedded ? ' is-embedded' : ' scroll-reveal'}`}
      aria-label="Procedural volume node graph"
    >
      <svg
        className="node-graph-svg"
        viewBox="0 0 1698 652"
        role="img"
        aria-label="Gaea texture nodes connected to a Blender Principled Volume node and DaVinci Resolve color nodes"
      >
        <defs>
          <clipPath id="gaea-node-clip">
            <rect x="22" y="318" width="548" height="307" />
          </clipPath>
          <clipPath id="principled-node-clip">
            <rect x="650" y="138" width="365" height="478" />
          </clipPath>
          <clipPath id="davinci-node-clip">
            <rect x="1228" y="32" width="430" height="98" />
          </clipPath>
        </defs>

        <path
          className="node-graph-wire node-graph-wire-purple"
          d="M552 414 C628 414 600 234 660 234"
        >
          {!reduceMotion && (
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              values="M552 414 C628 414 600 234 660 234; M540 400 C616 400 610 246 670 246; M560 409 C636 409 593 225 653 225; M552 414 C628 414 600 234 660 234"
              keyTimes="0;0.35;0.7;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            />
          )}
        </path>

        {!reduceMotion && (
          <path
            className="node-graph-flow node-graph-flow-purple"
            d="M552 414 C628 414 600 234 660 234"
          >
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              values="M552 414 C628 414 600 234 660 234; M540 400 C616 400 610 246 670 246; M560 409 C636 409 593 225 653 225; M552 414 C628 414 600 234 660 234"
              keyTimes="0;0.35;0.7;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            />
            <animate
              attributeName="stroke-dashoffset"
              from="110"
              to="0"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </path>
        )}

        <path
          className="node-graph-wire node-graph-wire-green"
          d="M1003 198 C1155 198 1138 82 1250 82"
        >
          {!reduceMotion && (
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              values="M1003 198 C1155 198 1138 82 1250 82; M1013 210 C1165 210 1152 72 1264 72; M996 189 C1148 189 1129 90 1241 90; M1003 198 C1155 198 1138 82 1250 82"
              keyTimes="0;0.35;0.7;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            />
          )}
        </path>

        {!reduceMotion && (
          <path
            className="node-graph-flow node-graph-flow-green"
            d="M1003 198 C1155 198 1138 82 1250 82"
          >
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              values="M1003 198 C1155 198 1138 82 1250 82; M1013 210 C1165 210 1152 72 1264 72; M996 189 C1148 189 1129 90 1241 90; M1003 198 C1155 198 1138 82 1250 82"
              keyTimes="0;0.35;0.7;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            />
            <animate
              attributeName="stroke-dashoffset"
              from="110"
              to="0"
              dur="2.15s"
              repeatCount="indefinite"
            />
          </path>
        )}

        <g clipPath="url(#gaea-node-clip)">
          <image href="/images/node-graph.png" width="1698" height="652" />
          {!reduceMotion && (
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="9s"
              repeatCount="indefinite"
              values="0 0;-12 -14;8 -5;0 0"
              keyTimes="0;0.35;0.7;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            />
          )}
        </g>

        <g clipPath="url(#principled-node-clip)">
          <image href="/images/node-graph.png" width="1698" height="652" />
          {!reduceMotion && (
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="9s"
              repeatCount="indefinite"
              values="0 0;10 12;-7 -9;0 0"
              keyTimes="0;0.35;0.7;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            />
          )}
        </g>

        <g clipPath="url(#davinci-node-clip)">
          <image href="/images/node-graph.png" width="1698" height="652" />
          {!reduceMotion && (
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="9s"
              repeatCount="indefinite"
              values="0 0;14 -10;-9 8;0 0"
              keyTimes="0;0.35;0.7;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            />
          )}
        </g>
      </svg>
    </section>
  );
};
