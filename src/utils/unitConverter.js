const conversionFactors = {
  centimeter: 100,
  chain: 0.0497096954,
  decimeter: 10,
  dekameter: 0.1,
  feet: 3.28084,
  furlong: 0.0049709695,
  gaj: 1.0936132983,
  gattha: 0.4444444444,
  hath: 2.1872265967,
  hectometer: 0.01,
  inch: 39.3701,
  jarib_gantari: 0.0303030303,
  jarib_shahjahani: 0.0060606061,
  karam: 0.5468066491,
  kilometer: 0.001,
  links: 4.9709695379,
  gunters_link: 4.9709695379,
  megameter: 0.000001,
  micrometer: 1000000,
  mile: 0.0006213712,
  millimeter: 1000,
  nautical_mile: 0.0005399568,
  perch: 0.1988387815,
  revenue_chain: 0.0151515152,
  yard: 1.0936132983,
};

// Converts from karam to other units
const convertFromKaram = (karam) => {
  const conversions = {};
  const meters = karam / conversionFactors.karam; // convert karam to meters
  for (const unit in conversionFactors) {
    conversions[unit] = meters * conversionFactors[unit];
  }
  return conversions;
};

module.exports = {
  convertFromKaram,
  conversionFactors,
};
