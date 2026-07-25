(function initThermodynamics(root) {
  'use strict';
  function phaseAtTemperature(profile, temperatureK) {
    if (!profile || !Number.isFinite(Number(temperatureK)) || Number(temperatureK) < 0) return 'unknown';
    const tm = Number(profile.melt);
    const tb = Number(profile.boil);
    if (profile.transition === 'sublimation') {
      return Number.isFinite(tb) && temperatureK >= tb ? 'gas' : 'solid';
    }
    if (!Number.isFinite(tm) || !Number.isFinite(tb) || tm < 0 || tb <= tm) return 'unknown';
    if (temperatureK < tm) return 'solid';
    if (temperatureK < tb) return 'liquid';
    return 'gas';
  }

  function lennardJonesForceMagnitude(distance, epsilon = 0.003, sigma = 3) {
    if (![distance,epsilon,sigma].every(Number.isFinite) || distance <= 0.01 || epsilon <= 0 || sigma <= 0 || distance > sigma * 2.5) return 0;
    const sr6 = Math.pow(sigma / distance, 6);
    return (24 * epsilon / distance) * (2 * sr6 * sr6 - sr6);
  }

  function reducedLennardJonesPotential(distance, epsilon = 0.003, sigma = 3) {
    if (![distance,epsilon,sigma].every(Number.isFinite) || distance <= 0 || epsilon <= 0 || sigma <= 0) return null;
    const sr6 = Math.pow(sigma / distance, 6);
    return 4 * epsilon * (sr6 * sr6 - sr6);
  }

  root.NULLA_THERMODYNAMICS = Object.freeze({phaseAtTemperature,lennardJonesForceMagnitude,reducedLennardJonesPotential});
})(globalThis);
