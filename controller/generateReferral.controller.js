function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toLowerCase();
}

module.exports = { generateReferralCode };
