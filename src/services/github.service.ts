// GitHub README içeriğini çeker; proje detay sayfasında ham markdown olarak render edilir.

export interface GithubRepoRef {
  owner: string
  repo: string
}

export function parseGithubUrl(url: string): GithubRepoRef | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/)
  if (!match) return null
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') }
}

export async function getReadme({ owner, repo }: GithubRepoRef): Promise<string> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: { Accept: 'application/vnd.github.raw+json' },
  })
  if (!response.ok) throw new Error(`README fetch failed: ${response.status}`)
  return response.text()
}
