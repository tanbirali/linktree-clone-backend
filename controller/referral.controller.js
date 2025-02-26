const pool = require("../config/db.config");

exports.getReferralStatus = async (req, res) => {
  const { id } = req.user;

  const stats = await pool.query(
    "SELECT COUNT(*) FROM referrals WHERE referrer_id = $1 AND status = 'successful' ",
    [id]
  );

  res.json({ referrals: stats.rows[0].count });
};
