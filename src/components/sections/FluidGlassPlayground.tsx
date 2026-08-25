/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import React, { useRef, useState, useEffect, memo, Suspense } from 'react';
import { Canvas, createPortal, useFrame, useThree, type ThreeElements } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  useScroll,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';
import { SectionLabel } from '../common/SectionLabel';

type ModeProps = Record<string, unknown>;

interface FluidGlassPlaygroundProps {
  lensProps?: ModeProps;
}

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
  children?: React.ReactNode;
  glb: string;
  geometryKey: string;
  modeProps?: ModeProps;
}

interface ZoomMaterial extends THREE.Material {
  zoom: number;
}

interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> {}

type ZoomGroup = THREE.Group & { children: ZoomMesh[] };

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  modeProps = {},
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => {
    const s = new THREE.Scene();
    s.background = new THREE.Color(0x5227ff);
    return s;
  });
  const geoWidthRef = useRef<number>(1);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      if (geo.boundingBox) {
        geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
      }
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = (pointer.x * v.width) / 2;
    const destY = (pointer.y * v.height) / 2;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.25, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x5227ff, 1);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  const geometry = (nodes[geometryKey] as THREE.Mesh)?.geometry;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.25}
        rotation-x={Math.PI / 2}
        geometry={geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          distortion={0.12}
          distortionScale={0.3}
          temporalDistortion={0.1}
          roughness={0}
          transmission={1}
          {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
        />
      </mesh>
    </>
  );
});

function Typography() {
  const DEVICE = {
    mobile: { fontSize: 0.2 },
    tablet: { fontSize: 0.38 },
    desktop: { fontSize: 0.55 }
  };
  const getDevice = () => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { fontSize } = DEVICE[device];

  return (
    <Text
      position={[0, 0, 12]}
      fontSize={fontSize}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      React Bits
    </Text>
  );
}

function Images() {
  const group = useRef<ZoomGroup>(null!);
  const data = useScroll();
  const { height } = useThree(s => s.viewport);

  useFrame(() => {
    if (!group.current || !group.current.children || group.current.children.length < 5) return;
    if (group.current.children[0]?.material) group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    if (group.current.children[1]?.material) group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    if (group.current.children[2]?.material) group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    if (group.current.children[3]?.material) group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    if (group.current.children[4]?.material) group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
  });

  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1]} url="/assets/demo/cs1.webp" />
      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />
      <Image position={[-2.05, -height, 6]} scale={[1, 3]} url="/assets/demo/cs3.webp" />
      <Image position={[-0.6, -height, 9]} scale={[1, 2]} url="/assets/demo/cs1.webp" />
      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/assets/demo/cs2.webp" />
    </group>
  );
}

export const FluidGlassCanvas: React.FC<FluidGlassPlaygroundProps> = ({
  lensProps = {
    scale: 0.25,
    ior: 1.15,
    thickness: 5,
    chromaticAberration: 0.1,
    anisotropy: 0.01
  }
}) => {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
      <ScrollControls damping={0.2} pages={3} distance={0.4}>
        <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" modeProps={lensProps}>
          <Scroll>
            <Typography />
            <Images />
          </Scroll>
          <Scroll html />
          <Preload />
        </ModeWrapper>
      </ScrollControls>
    </Canvas>
  );
};

export const FluidGlassPlayground: React.FC = () => {
  return (
    <section id="fluid-glass-playground" className="container section-spacer scroll-reveal">
      <SectionLabel label="02 / fluid glass lens lab" />
      <div
        style={{
          height: '600px',
          position: 'relative',
          width: '100%',
          borderRadius: '0px',
          overflow: 'hidden',
          background: '#5227ff',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.45)'
        }}
      >
        <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#5227ff' }} />}>
          <FluidGlassCanvas
            lensProps={{
              scale: 0.25,
              ior: 1.15,
              thickness: 5,
              chromaticAberration: 0.1,
              anisotropy: 0.01
            }}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default FluidGlassPlayground;

useGLTF.preload('/assets/3d/lens.glb');
