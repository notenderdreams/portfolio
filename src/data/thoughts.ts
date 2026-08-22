import { ThoughtAnnotation } from '../types';

export const topThoughts: { left: ThoughtAnnotation; right: ThoughtAnnotation } = {
  left: {
    id: 'top-left',
    text: 'turned up volume density and my GPU started crying',
    doodleSrc: '/doodles/arrows/arrow-11.svg',
    doodleClass: 'doodle-down-right doodle-md',
    tiltClass: 'tilt-left-2',
    doodlePosition: 'right',
  },
  right: {
    id: 'top-right',
    text: "i don't know color grading I just play with random nodes",
    doodleSrc: '/doodles/arrows/arrow-13.svg',
    doodleClass: 'doodle-down-left doodle-md',
    tiltClass: 'tilt-right-1',
    doodlePosition: 'left',
  },
};

export const leftFlankThoughts: ThoughtAnnotation[] = [
  {
    id: 'flank-left-1',
    text: 'UE5 crashed without saving · rebuilding the fog from memory',
    doodleSrc: '/doodles/arrows/arrow-1.svg',
    doodleClass: 'doodle-arrow-right doodle-lg',
    tiltClass: 'tilt-left-1',
    doodlePosition: 'right',
  },
  {
    id: 'flank-left-2',
    text: 'segfault at 3 AM · borrow checker fighting for its life',
    doodleSrc: '/doodles/arrows/arrow-14.svg',
    doodleClass: 'doodle-arrow-right doodle-md',
    tiltClass: 'tilt-left-3',
    doodlePosition: 'right',
  },
];

export const rightFlankThoughts: ThoughtAnnotation[] = [
  {
    id: 'flank-right-1',
    text: 'made a 4-bar loop and listened to it for 6 hours straight',
    doodleSrc: '/doodles/arrows/arrow-31.svg',
    doodleClass: 'doodle-arrow-left doodle-curve',
    tiltClass: 'tilt-right-2',
    doodlePosition: 'left',
  },
  {
    id: 'flank-right-2',
    text: 'not a designer · just moving pixels by 1px until it looks less broken',
    doodleSrc: '/doodles/misc/misc-10.svg',
    doodleClass: 'doodle-star doodle-accent',
    tiltClass: 'tilt-right-4',
    doodlePosition: 'left',
    isSmall: true,
  },
];
