import React, { useEffect, useRef, useState } from 'react';

interface NodeGraphPreviewProps {
  embedded?: boolean;
}

type NodeKey = 'gaea' | 'principled' | 'davinci';

interface NodeState {
  drag: { x: number; y: number };
  ambient: { x: number; y: number };
  isDragging: boolean;
  pointerDownStart: { x: number; y: number; nodeStartX: number; nodeStartY: number } | null;
}

const WIRE_PORTS = {
  purple: {
    start: { x: 552, y: 414 }, // Gaea output
    end: { x: 660, y: 234 }    // Principled volume input
  },
  green: {
    start: { x: 1003, y: 198 }, // Principled volume output
    end: { x: 1250, y: 82 }     // DaVinci input
  }
};

const getAmbientOffset = (nodeKey: NodeKey, timeSec: number) => {
  switch (nodeKey) {
    case 'gaea':
      return {
        x: Math.sin(timeSec * 0.7) * -8 + Math.cos(timeSec * 0.35) * 4,
        y: Math.cos(timeSec * 0.65) * -10 + Math.sin(timeSec * 0.3) * 3
      };
    case 'principled':
      return {
        x: Math.sin(timeSec * 0.65 + 2) * 7 + Math.cos(timeSec * 0.4 + 1) * -3,
        y: Math.cos(timeSec * 0.6 + 2) * 8 + Math.sin(timeSec * 0.35 + 2) * -4
      };
    case 'davinci':
      return {
        x: Math.sin(timeSec * 0.7 + 4) * 9 + Math.cos(timeSec * 0.35 + 3) * -4,
        y: Math.cos(timeSec * 0.65 + 4) * -7 + Math.sin(timeSec * 0.3 + 4) * 3
      };
  }
};

const computeWirePath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = Math.abs(x2 - x1);
  const curvature = Math.max(dx * 0.5, 45);
  const cp1x = x1 + (x2 >= x1 ? curvature : -curvature * 0.5);
  const cp1y = y1;
  const cp2x = x2 - (x2 >= x1 ? curvature : -curvature * 0.5);
  const cp2y = y2;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

export const NodeGraphPreview: React.FC<NodeGraphPreviewProps> = ({ embedded = false }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduceMotionRef = useRef(false);

  const purpleWireRef = useRef<SVGPathElement>(null);
  const purpleFlowRef = useRef<SVGPathElement>(null);
  const greenWireRef = useRef<SVGPathElement>(null);
  const greenFlowRef = useRef<SVGPathElement>(null);

  const [activeDrag, setActiveDrag] = useState<NodeKey | null>(null);
  const [renderOrder, setRenderOrder] = useState<NodeKey[]>(['gaea', 'principled', 'davinci']);
  const activeNodeKeyRef = useRef<NodeKey | null>(null);

  const gaeaGroupRef = useRef<SVGGElement>(null);
  const principledGroupRef = useRef<SVGGElement>(null);
  const davinciGroupRef = useRef<SVGGElement>(null);

  const nodesRef = useRef<Record<NodeKey, NodeState>>({
    gaea: {
      drag: { x: 0, y: 0 },
      ambient: { x: 0, y: 0 },
      isDragging: false,
      pointerDownStart: null
    },
    principled: {
      drag: { x: 0, y: 0 },
      ambient: { x: 0, y: 0 },
      isDragging: false,
      pointerDownStart: null
    },
    davinci: {
      drag: { x: 0, y: 0 },
      ambient: { x: 0, y: 0 },
      isDragging: false,
      pointerDownStart: null
    }
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      reduceMotionRef.current = mediaQuery.matches;
    };

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const nodeElements: Record<NodeKey, React.RefObject<SVGGElement>> = {
      gaea: gaeaGroupRef,
      principled: principledGroupRef,
      davinci: davinciGroupRef
    };

    const tick = (now: number) => {
      const timeSec = (now - startTime) / 1000;
      const reduce = reduceMotionRef.current;
      const nodes = nodesRef.current;
      const keys: NodeKey[] = ['gaea', 'principled', 'davinci'];

      const totalPositions: Record<NodeKey, { x: number; y: number }> = {
        gaea: { x: 0, y: 0 },
        principled: { x: 0, y: 0 },
        davinci: { x: 0, y: 0 }
      };

      keys.forEach((key) => {
        const node = nodes[key];
        const targetAmbient = reduce ? { x: 0, y: 0 } : getAmbientOffset(key, timeSec);

        if (node.isDragging) {
          // While dragging, ambient gracefully relaxes to 0 so movement is purely pointer-driven
          node.ambient.x += (0 - node.ambient.x) * 0.12;
          node.ambient.y += (0 - node.ambient.y) * 0.12;
        } else {
          // Smooth, continuous glide back without any hard reset or popping
          node.drag.x += (0 - node.drag.x) * 0.06;
          node.drag.y += (0 - node.drag.y) * 0.06;

          // Seamlessly blend back into the natural ambient floating wave
          node.ambient.x += (targetAmbient.x - node.ambient.x) * 0.05;
          node.ambient.y += (targetAmbient.y - node.ambient.y) * 0.05;
        }

        const totalX = node.drag.x + node.ambient.x;
        const totalY = node.drag.y + node.ambient.y;
        totalPositions[key] = { x: totalX, y: totalY };

        const el = nodeElements[key].current;
        if (el) {
          el.setAttribute('transform', `translate(${totalX.toFixed(2)}, ${totalY.toFixed(2)})`);
        }
      });

      // Update dynamic bezier curves for wires
      const p1x = WIRE_PORTS.purple.start.x + totalPositions.gaea.x;
      const p1y = WIRE_PORTS.purple.start.y + totalPositions.gaea.y;
      const p2x = WIRE_PORTS.purple.end.x + totalPositions.principled.x;
      const p2y = WIRE_PORTS.purple.end.y + totalPositions.principled.y;
      const purpleD = computeWirePath(p1x, p1y, p2x, p2y);

      if (purpleWireRef.current) purpleWireRef.current.setAttribute('d', purpleD);
      if (purpleFlowRef.current) purpleFlowRef.current.setAttribute('d', purpleD);

      const g1x = WIRE_PORTS.green.start.x + totalPositions.principled.x;
      const g1y = WIRE_PORTS.green.start.y + totalPositions.principled.y;
      const g2x = WIRE_PORTS.green.end.x + totalPositions.davinci.x;
      const g2y = WIRE_PORTS.green.end.y + totalPositions.davinci.y;
      const greenD = computeWirePath(g1x, g1y, g2x, g2y);

      if (greenWireRef.current) greenWireRef.current.setAttribute('d', greenD);
      if (greenFlowRef.current) greenFlowRef.current.setAttribute('d', greenD);

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const getSVGCoordinates = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: clientX, y: clientY };

    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (ctm) {
      const transformed = pt.matrixTransform(ctm.inverse());
      return { x: transformed.x, y: transformed.y };
    }

    const rect = svg.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 1698,
      y: ((clientY - rect.top) / rect.height) * 652
    };
  };

  const handlePointerDown = (nodeKey: NodeKey, event: React.PointerEvent<SVGGElement>) => {
    event.preventDefault();
    const coords = getSVGCoordinates(event.clientX, event.clientY);
    const node = nodesRef.current[nodeKey];

    activeNodeKeyRef.current = nodeKey;
    node.pointerDownStart = {
      x: coords.x,
      y: coords.y,
      nodeStartX: node.drag.x,
      nodeStartY: node.drag.y
    };
    node.isDragging = false;
  };

  // Global bulletproof pointer tracking on window
  useEffect(() => {
    const DRAG_THRESHOLD = 5;
    const SOFT_LIMIT_RADIUS = 260;

    const handleGlobalPointerMove = (event: PointerEvent) => {
      const activeKey = activeNodeKeyRef.current;
      if (!activeKey) return;

      // If user released mouse buttons anywhere, immediately release drag
      if (event.buttons === 0) {
        handleGlobalPointerUp();
        return;
      }

      const node = nodesRef.current[activeKey];
      if (!node || !node.pointerDownStart) return;

      const coords = getSVGCoordinates(event.clientX, event.clientY);
      const deltaX = coords.x - node.pointerDownStart.x;
      const deltaY = coords.y - node.pointerDownStart.y;
      const moveDist = Math.hypot(deltaX, deltaY);

      if (!node.isDragging) {
        if (moveDist > DRAG_THRESHOLD) {
          node.isDragging = true;
          setActiveDrag(activeKey);
          setRenderOrder((prev) => [...prev.filter((k) => k !== activeKey), activeKey]);
        } else {
          return;
        }
      }

      const targetX = node.pointerDownStart.nodeStartX + deltaX;
      const targetY = node.pointerDownStart.nodeStartY + deltaY;
      const targetDist = Math.hypot(targetX, targetY);

      if (targetDist > SOFT_LIMIT_RADIUS) {
        const excess = targetDist - SOFT_LIMIT_RADIUS;
        const dampedExcess = (excess * 80) / (excess + 80);
        const clampedDist = SOFT_LIMIT_RADIUS + dampedExcess;
        const ratio = clampedDist / targetDist;
        node.drag.x = targetX * ratio;
        node.drag.y = targetY * ratio;
      } else {
        node.drag.x = targetX;
        node.drag.y = targetY;
      }
    };

    const handleGlobalPointerUp = () => {
      activeNodeKeyRef.current = null;
      const keys: NodeKey[] = ['gaea', 'principled', 'davinci'];
      keys.forEach((k) => {
        const node = nodesRef.current[k];
        node.isDragging = false;
        node.pointerDownStart = null;
      });
      setActiveDrag(null);
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    window.addEventListener('pointerup', handleGlobalPointerUp, { passive: true });
    window.addEventListener('pointercancel', handleGlobalPointerUp, { passive: true });
    window.addEventListener('blur', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
      window.removeEventListener('blur', handleGlobalPointerUp);
    };
  }, []);

  const renderNode = (key: NodeKey) => {
    switch (key) {
      case 'gaea':
        return (
          <g
            key="gaea"
            ref={gaeaGroupRef}
            className={`node-graph-node ${activeDrag === 'gaea' ? 'is-dragging' : ''}`}
            clipPath="url(#gaea-node-clip)"
            role="button"
            tabIndex={0}
            aria-label="Gaea terrain heightmap procedural node"
            onPointerDown={(e) => handlePointerDown('gaea', e)}
          >
            <image href="/images/node-graph.png" width="1698" height="652" pointerEvents="none" />
            <rect x="22" y="318" width="548" height="307" fill="transparent" pointerEvents="all" />
          </g>
        );
      case 'principled':
        return (
          <g
            key="principled"
            ref={principledGroupRef}
            className={`node-graph-node ${activeDrag === 'principled' ? 'is-dragging' : ''}`}
            clipPath="url(#principled-node-clip)"
            role="button"
            tabIndex={0}
            aria-label="Blender Principled Volume shader node"
            onPointerDown={(e) => handlePointerDown('principled', e)}
          >
            <image href="/images/node-graph.png" width="1698" height="652" pointerEvents="none" />
            <rect x="650" y="138" width="365" height="478" fill="transparent" pointerEvents="all" />
          </g>
        );
      case 'davinci':
        return (
          <g
            key="davinci"
            ref={davinciGroupRef}
            className={`node-graph-node ${activeDrag === 'davinci' ? 'is-dragging' : ''}`}
            clipPath="url(#davinci-node-clip)"
            role="button"
            tabIndex={0}
            aria-label="DaVinci Resolve ACES transform color grade node"
            onPointerDown={(e) => handlePointerDown('davinci', e)}
          >
            <image href="/images/node-graph.png" width="1698" height="652" pointerEvents="none" />
            <rect x="1228" y="32" width="430" height="98" fill="transparent" pointerEvents="all" />
          </g>
        );
    }
  };

  return (
    <section
      className={`node-graph-section${embedded ? ' is-embedded' : ' scroll-reveal'}`}
      aria-label="Procedural volume node graph"
    >
      <svg
        ref={svgRef}
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

        {/* Purple wire connecting Gaea to Principled Volume */}
        <path
          ref={purpleWireRef}
          className="node-graph-wire node-graph-wire-purple"
          d="M 552 414 C 606 414, 606 234, 660 234"
        />
        <path
          ref={purpleFlowRef}
          className="node-graph-flow node-graph-flow-purple"
          d="M 552 414 C 606 414, 606 234, 660 234"
        />

        {/* Green wire connecting Principled Volume to DaVinci Resolve */}
        <path
          ref={greenWireRef}
          className="node-graph-wire node-graph-wire-green"
          d="M 1003 198 C 1126 198, 1126 82, 1250 82"
        />
        <path
          ref={greenFlowRef}
          className="node-graph-flow node-graph-flow-green"
          d="M 1003 198 C 1126 198, 1126 82, 1250 82"
        />

        {/* Draggable Nodes */}
        {renderOrder.map(renderNode)}
      </svg>
    </section>
  );
};
