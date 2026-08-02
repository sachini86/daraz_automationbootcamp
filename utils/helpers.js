// utils/helpers.js
const fs = require('fs');
const path = require('path');

/**
 * Loads a .env-style file into process.env
 * @param {string} envName - 'qa' or 'stag'
 */
function loadEnvFile(envName = 'qa') {
  const envPath = path.resolve(__dirname, `../env/${envName}.env`);
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

/**
 * Calculates the expected cart badge count after an add/remove action.
 * @param {number|string} beforeCount
 * @param {number} delta - +1 for add, -1 for remove
 */
function getCartBadgeExpectedCount(beforeCount, delta) {
  const next = Number(beforeCount || 0) + delta;
  return next > 0 ? next.toString() : '';
}

module.exports = { loadEnvFile, getCartBadgeExpectedCount };
