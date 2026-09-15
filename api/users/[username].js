export default async function handler(req, res) {
  const { username } = req.query;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2026-03-10",
        },
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to connect to GitHub API",
    });
  }
}