// Vercel Serverless Function for Snake Game Leaderboard
// This stores the leaderboard in Vercel KV (Key-Value storage)

let leaderboard = [];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Return top 10 scores (one per user, highest score only)
    const uniqueLeaderboard = [];
    const seenUsers = new Set();
    
    const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
    
    for (const entry of sorted) {
      if (!seenUsers.has(entry.username.toLowerCase())) {
        uniqueLeaderboard.push(entry);
        seenUsers.add(entry.username.toLowerCase());
      }
      if (uniqueLeaderboard.length >= 10) break;
    }
    
    return res.status(200).json({
      success: true,
      leaderboard: uniqueLeaderboard
    });
  }

  if (req.method === 'POST') {
    try {
      const { username, score } = req.body;

      if (!username || typeof score !== 'number') {
        return res.status(400).json({
          success: false,
          error: 'Invalid data'
        });
      }

      const cleanUsername = username.trim().substring(0, 15);
      
      // Check if username exists
      const existingUser = leaderboard.find(
        entry => entry.username.toLowerCase() === cleanUsername.toLowerCase()
      );

      if (existingUser) {
        // Update only if new score is higher
        if (score > existingUser.score) {
          existingUser.score = score;
          existingUser.date = new Date().toISOString();
        }
      } else {
        // Add new user
        leaderboard.push({
          username: cleanUsername,
          score: score,
          date: new Date().toISOString()
        });
      }

      // Keep only top 100 to prevent unlimited growth
      leaderboard = leaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 100);

      return res.status(200).json({
        success: true,
        message: 'Score saved',
        isNewUser: !existingUser
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Server error'
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
