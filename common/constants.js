// common/constants.js
// Central place for constants shared across the framework.
// NOTE: Some string values below are best-guess based on typical Daraz.lk
// markup as covered in the bootcamp slides. Before running the suite,
// inspect the live site (right-click -> Inspect) and adjust any locator
// that does not match reality. This inspection step is part of the exercise.

const SELECTORS = {
  header: {
    searchInput: 'Search in Daraz',       // placeholder text
    loginLink: 'Login / Register',        // link/button name in header
    cartIcon: 'Go to Cart',               // title/name for cart icon
    languageSwitcher: 'language-switcher' // test-id or locator hook
  },
  home: {
    logo: 'Daraz Logo' // alt text
  }
};

const TIMEOUTS = {
  default: 10000,
  short: 3000,
  long: 20000
};

module.exports = { SELECTORS, TIMEOUTS };
