export interface TeamMember {
  title: string;
  order: number;
  slug: string;
  role: string;
  description: string;
  education: string[];
  expertise: string[];
  hobbies: string[];
  favoriteGames: string[];
  projectSlugs: string[];
  featuredImage: string | null;
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    web?: string;
    linkedin?: string;
    researchgate?: string;
  };
  body: string;
}

export interface Project {
  title: string;
  shortname: string;
  slug: string;
  date: string;
  memberSlugs: string[];
  description: string;
  featuredImage: string | null;
  featuredWideImage: string | null;
  isActive: boolean;
  draft: boolean;
  body: string;
}

export interface Publication {
  title: string;
  type: string;
  slug: string;
  date: string;
  authors: string;
  authorsSlug: string[];
  category: string;
  journal: string;
  url: string;
  abstrakt: string | null;
  body: string;
}
