import { NavLink, SocialLink } from '../types';

export const siteMetadata = {
  name: 'sajid al nahian',
  brandMark: 'sajid al nahian',
  location: 'dhaka, bd',
  locationBangla: 'ঢাকা',
  heroProse:
    'BUILDING LOW-LEVEL SYSTEMS IN RUST AND C, UNDERSTANDING THAT MASTERY TAKES TIME. NOT EVERY LINE SHOWS IMMEDIATE PROGRESS, YET NOTHING IS WASTED. GROWTH IS HAPPENING EVEN WHEN BARE-METAL CODE, 3D SCENES, AND AMBIENT SOUNDSCAPES FEEL INVISIBLE.',
  email: 'sajidalnahian@gmail.com',
};

export const navLinks: NavLink[] = [
  { label: 'work', href: '#work' },
  { label: 'about', href: '#about' },
  { label: 'toolbox', href: '#toolbox' },
  { label: 'contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { label: 'github', href: 'https://github.com/sajidalnahian', isExternal: true },
  { label: 'x / twitter', href: 'https://x.com', isExternal: true },
  { label: 'are.na', href: 'https://are.na', isExternal: true },
  { label: 'spotify', href: 'https://spotify.com', isExternal: true },
];
