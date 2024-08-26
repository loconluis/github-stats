// Github Service
import axios from 'axios';
import { UserStats, Repo } from '../interfaces';
import dotenv from 'dotenv';
dotenv.config();
export class GithubService {
  private baseURL;
  private headers;

  constructor() {
    this.baseURL = process.env.BASE_URI_GH;
    this.headers = {
      Authorization: `Bearer ${process.env.GH_TOKEN}`,
      Accepts: `application/vnd.github.v3+json`,
    };
  }

  /**
   * Retrieves the user's public repositories
   * @param username string
   * @returns An array of public repositories
   */
  public async getUserRepositories(username: string): Promise<Repo[]> {
    try {
      const res = await axios.get<Repo[]>(
        `${this.baseURL}/users/${username}/repos`,
        {
          headers: this.headers,
        }
      );
      return res.data;
    } catch (error) {
      throw this.handlerError(error);
    }
  }

  /**
   * Retrieves statistics for a github user
   * @param username string
   * @returns A statistics object UserStats
   */
  public async getUsersStats(username: string): Promise<UserStats> {
    let repos = await this.getUserRepositories(username);
    return {
      total: repos.length,
      totalStars: repos.reduce((carry, r) => carry + r.stargazers_count, 0),
      totalForks: repos.reduce((carry, r) => carry + r.forks_count, 0),
      mostUsedLanguage: this.mostUsedLanguage(repos),
      mostStarredRepo: this.mostStarredRepo(repos),
    };
  }

  /**
   * Retrieves the name of the repository with the most stars
   * @param repos array Repo[]
   * @returns an string with the name of the most starred repo
   */
  private mostStarredRepo(repos: Repo[]): string {
    const mostStarred = repos.reduce(
      (carry, repo) =>
        repo.stargazers_count > carry.stargazers_count ? repo : carry,
      repos[0]
    );
    return mostStarred.name;
  }

  /**
   * Retrieves the name of the language most used by the user
   * @param repos array Repo[]
   * @returns an string with the language most used
   */
  private mostUsedLanguage(repos: Repo[]): string {
    const mostUsedLang: Record<string, number> = {};

    repos.forEach((repo) => {
      if (repo.language) {
        mostUsedLang[repo.language] = (mostUsedLang[repo.language] || 0) + 1;
      }
    });

    return Object.keys(mostUsedLang).reduce(
      (a, b) => (mostUsedLang[a] > mostUsedLang[b] ? a : b),
      'N/A'
    );
  }

  /**
   * Handle the errors
   * @param e captured error
   * @throws Custom error
   */
  private handlerError(e: any): Error {
    if (e.response) {
      throw new Error(
        `GitHub API Error: ${e.response.status} - ${e.response.data.message}`
      );
    } else if (e.request) {
      throw new Error('GitHub API Error: No response received from GitHub');
    } else {
      throw new Error(`Unexpected Error: ${e.message}`);
    }
  }
}

export default new GithubService();
