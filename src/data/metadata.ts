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
  email: 'san.mugdho@gmail.com',
  secondaryEmail: 'mugdho@iut-dhaka.edu',
  emails: ['san.mugdho@gmail.com', 'mugdho@iut-dhaka.edu'],
};

export const navLinks: NavLink[] = [
  { label: 'profile', href: '#about' },
  { label: 'origin', href: '#origin' },
  { label: 'work', href: '#work' },
  { label: 'toolbox', href: '#toolbox' },
  { label: 'contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { label: 'twitter', href: 'https://x.com/notenderdreams', isExternal: true },
  { label: 'facebook', href: 'https://www.facebook.com/enderdreams', isExternal: true },
  { label: 'instagram', href: 'https://www.instagram.com/enderdreams.dll/', isExternal: true },
  { label: 'reddit', href: 'https://www.reddit.com/user/notenderdreams/', isExternal: true },
];

export const competitiveLinks: SocialLink[] = [
  { label: 'github', href: 'https://github.com/notenderdreams/', isExternal: true },
  { label: 'codeforces', href: 'https://codeforces.com/profile/enderdreams', isExternal: true },
  { label: 'leetcode', href: 'https://leetcode.com/u/notenderdreams/', isExternal: true },
  { label: 'kaggle', href: 'https://www.kaggle.com/miscspace', isExternal: true },
];
