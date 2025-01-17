export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PokéPick",
  description: "Pick your favorite Pokémon!",
  navItems: [
    {
      label: "Pokémons",
      href: "/pokemon",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "API used",
      href: "/api",
    },
  ],
  navMenuItems: [
    {
      label: "Pokémons",
      href: "/pokemon",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "API used",
      href: "/api",
    },
  ],
  links: {
    github: "https://github.com/alirezajm1382",
    twitter: "https://x.com/berlinify",
    docs: "https://heroui.com",
  },
};
