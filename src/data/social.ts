export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/manikanta-pothurajula',
    icon: 'linkedin',
    username: 'manikanta-pothurajula'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/manikswamy3311',
    icon: 'github',
    username: 'manikswamy3311'
  },
  {
    platform: 'Email',
    url: 'mailto:manikswamy3311@gmail.com',
    icon: 'email',
    username: 'manikswamy3311@gmail.com'
  }
];
