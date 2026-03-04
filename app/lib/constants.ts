// lib/constants.ts
export const NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  { 
    label: 'Services', 
    submenu: [
      { label: 'Développement Web', href: '/services#web' },
      { label: 'Applications Mobile', href: '/services#mobile' },
      { label: 'UI/UX Design', href: '/services#design' },
      { label: 'Consulting Tech', href: '/services#consulting' },
    ]
  },
  { label: 'Projets', href: '/projets' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/PATAWALA',
  linkedin: 'https://www.linkedin.com/in/abdoulaye-patawala-84b138381/',
  twitter: 'https://x.com/AbdoulayeP79682',
  email: 'patawalaabdoulaye2003@gmail.com'
};

export const CONTACT_INFO = {
  email: 'patawalaabdoulaye2003@gmail.com',
  phone: '+33 6 XX XX XX XX',
  location: 'Paris, France'
};

// Sections dans l'ordre d'affichage
export const HOME_SECTIONS = [
  'hero',
  'services',
  'projets',
  'blog',
  'contact'
];