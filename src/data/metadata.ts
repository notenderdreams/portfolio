import { NavLink, SocialLink } from '../types';

export const siteMetadata = {
  name: 'sajid al nahian',
  brandMark: 'sajid al nahian',
  location: 'dhaka, bd',
  locationBangla: 'ঢাকা',
  age: 22,
  university: 'Islamic University of Technology',
  degree: 'B.Sc. in Computer Science and Engineering',
  term: 'Year 2, Semester 2',
  email: 'sajidalnahian@gmail.com',
};

export const navLinks: NavLink[] = [
  { label: 'about', href: '#about' },
  { label: 'work', href: '#work' },
  { label: 'toolbox', href: '#toolbox' },
  { label: 'contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { label: 'github', href: 'https://github.com/sajidalnahian', isExternal: true },
  { label: 'x / twitter', href: 'https://x.com', isExternal: true },
  { label: 'are.na', href: 'https://are.na', isExternal: true },
  { label: 'spotify', href: 'https://spotify.com', isExternal: true },
];
