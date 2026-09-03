import { NavLink, SocialLink } from '../types';

export const siteMetadata = {
  name: 'sajid al nahian mugdho',
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
  { label: 'twitter', href: 'https://x.com', isExternal: true },
  { label: 'facebook', href: 'https://facebook.com', isExternal: true },
  { label: 'instagram', href: 'https://instagram.com', isExternal: true },
];

export const competitiveLinks: SocialLink[] = [
  { label: 'codeforces', href: 'https://codeforces.com', isExternal: true },
  { label: 'leetcode', href: 'https://leetcode.com', isExternal: true },
  { label: 'codechef', href: 'https://www.codechef.com', isExternal: true },
  { label: 'kaggle', href: 'https://www.kaggle.com', isExternal: true },
];
