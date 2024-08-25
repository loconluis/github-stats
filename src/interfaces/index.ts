export interface UserStats {
  total: number;
  totalStars: number;
  totalForks: number;
  mostUsedLanguage: string;
  mostStarredRepo: string;
}

export interface Repo {
  id: number;
  name: string;
  url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
}

export interface Seed {
  repo: Repo[];
}
