export default async function handler(req, res) {
  const { path = [] } = req.query;

  const githubPath = Array.isArray(path)
    ? path.join("/")
    : path;

  const queryString = new URLSearchParams(req.query);

  queryString.delete("path");

  const query = queryString.toString();

  const url = `https://api.github.com/${githubPath}${
    query ? `?${query}` : ""
  }`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2026-03-10",
      },
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to connect to GitHub API",
    });
  }
}