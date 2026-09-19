import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type SectionId = 'about' | 'origin' | 'work' | 'toolbox' | 'contact' | 'footer';

export interface SectionSpec {
  id: SectionId;
  importer: () => Promise<{ default: React.ComponentType }>;
  assets?: string[];
  minHeight: number;
}

export const SECTION_SPECS: SectionSpec[] = [
  {
    id: 'about',
    importer: () =>
      import('../components/sections/AboutSection').then((m) => ({ default: m.AboutSection })),
    assets: ['/images/pro-pic.webp', '/images/nahian.webp'],
    minHeight: 520,
  },
  {
    id: 'origin',
    importer: () =>
      import('../components/sections/OriginSection').then((m) => ({ default: m.OriginSection })),
    assets: [
      '/images/esp-mugdho.webp',
      '/images/photo-manipulation-falling.webp',
      '/images/photo-manipulation-car.webp',
      '/images/node-graph.webp',
      '/images/gatekeeper-midi.webp',
      '/images/viewer.webp',
    ],
    minHeight: 700,
  },
  {
    id: 'work',
    importer: () =>
      import('../components/sections/SelectedWorks').then((m) => ({ default: m.SelectedWorks })),
    assets: [
      '/images/projects/voidcrate_home.webp',
      '/images/projects/voidcrate_assets.webp',
      '/images/projects/voidcrate_projects.webp',
    ],
    minHeight: 650,
  },
  {
    id: 'toolbox',
    importer: () =>
      import('../components/sections/ToolboxSection').then((m) => ({ default: m.ToolboxSection })),
    minHeight: 600,
  },
  {
    id: 'contact',
    importer: () =>
      import('../components/sections/ContactSection').then((m) => ({ default: m.ContactSection })),
    assets: ['/images/nokia-connecting-screen.webp'],
    minHeight: 480,
  },
  {
    id: 'footer',
    importer: () =>
      import('../components/layout/Footer').then((m) => ({ default: m.Footer })),
    assets: ['/images/sign-bangla.webp'],
    minHeight: 320,
  },
];

const preloadSectionAssets = (assets?: string[]) => {
  if (!assets || assets.length === 0) return;
  assets.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const runWhenIdle = (cb: () => void, delay = 100): (() => void) => {
  let cancelled = false;
  let timerId: number | undefined;
  let idleId: number | undefined;

  const execute = () => {
    if (!cancelled) cb();
  };

  if ('requestIdleCallback' in window) {
    idleId = (window as unknown as { requestIdleCallback: (fn: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
      execute,
      { timeout: 350 }
    );
  } else {
    timerId = setTimeout(execute, delay) as unknown as number;
  }

  return () => {
    cancelled = true;
    if (timerId !== undefined) clearTimeout(timerId);
    if (idleId !== undefined && 'cancelIdleCallback' in window) {
      (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
    }
  };
};

export function useSectionLoader(startLoading: boolean = true) {
  const [loadedMap, setLoadedMap] = useState<Partial<Record<SectionId, React.ComponentType>>>({});
  const inFlightRef = useRef<Map<SectionId, Promise<React.ComponentType>>>(new Map());
  const currentIndexRef = useRef<number>(0);
  const cancelIdleRef = useRef<(() => void) | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  const loadSingleSection = useCallback(async (spec: SectionSpec): Promise<React.ComponentType> => {
    if (inFlightRef.current.has(spec.id)) {
      return inFlightRef.current.get(spec.id)!;
    }

    preloadSectionAssets(spec.assets);

    const promise = spec.importer().then((mod) => {
      const Component = mod.default;
      if (!isCancelledRef.current) {
        setLoadedMap((prev) => {
          if (prev[spec.id]) return prev;
          return { ...prev, [spec.id]: Component };
        });

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          setTimeout(() => ScrollTrigger.refresh(), 60);
        });
      }
      return Component;
    });

    inFlightRef.current.set(spec.id, promise);
    return promise;
  }, []);

  const prioritizeUpTo = useCallback(
    async (targetId: SectionId) => {
      const targetIdx = SECTION_SPECS.findIndex((s) => s.id === targetId);
      if (targetIdx < 0) return;

      // Load all sections up to the target immediately in parallel/rapid succession
      for (let i = 0; i <= targetIdx; i++) {
        const spec = SECTION_SPECS[i];
        loadSingleSection(spec);
      }
    },
    [loadSingleSection]
  );

  // Progressive sequential loading pipeline: loads section-by-section in order
  useEffect(() => {
    if (!startLoading) return;
    isCancelledRef.current = false;

    let isMounted = true;

    const loadNextInSequence = async () => {
      if (!isMounted || isCancelledRef.current) return;
      if (currentIndexRef.current >= SECTION_SPECS.length) return;

      const spec = SECTION_SPECS[currentIndexRef.current];
      try {
        await loadSingleSection(spec);
      } catch (err) {
        console.error(`Failed to lazy load section: ${spec.id}`, err);
      }

      if (!isMounted || isCancelledRef.current) return;
      currentIndexRef.current += 1;

      if (currentIndexRef.current < SECTION_SPECS.length) {
        cancelIdleRef.current = runWhenIdle(() => {
          loadNextInSequence();
        }, 120);
      }
    };

    // Kick off progressive sequential loading
    loadNextInSequence();

    return () => {
      isMounted = false;
      isCancelledRef.current = true;
      if (cancelIdleRef.current) {
        cancelIdleRef.current();
      }
    };
  }, [startLoading, loadSingleSection]);

  // Handle hash navigation click acceleration
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const hashId = href.slice(1) as SectionId;
      const matchingSpec = SECTION_SPECS.find((s) => s.id === hashId);
      if (matchingSpec) {
        prioritizeUpTo(matchingSpec.id);
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => document.removeEventListener('click', handleAnchorClick, { capture: true });
  }, [prioritizeUpTo]);

  return {
    loadedMap,
    prioritizeUpTo,
  };
}
