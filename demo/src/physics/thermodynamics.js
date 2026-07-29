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

  function hasUsablePhaseProfile(profile) {
    if (!profile) return false;
    const tm = Number(profile.melt);
    const tb = Number(profile.boil);
    if (profile.transition === 'sublimation') return Number.isFinite(tb) && tb > 0;
    return Number.isFinite(tm) && Number.isFinite(tb) && tm >= 0 && tb > tm;
  }

  function phaseStatus(profile, temperatureK) {
    if (!hasUsablePhaseProfile(profile) || !Number.isFinite(Number(temperatureK)) || temperatureK < 0) {
      return {key:'unknown',progress:null,nextTransitionK:null,atTransition:false,transition:'unknown'};
    }
    const key = phaseAtTemperature(profile,temperatureK);
    const tm = Number(profile.melt);
    const tb = Number(profile.boil);
    if (profile.transition === 'sublimation') {
      const atTransition = Math.abs(temperatureK - tb) < 0.5;
      return {
        key,
        progress:Math.max(0,Math.min(1,temperatureK / tb)),
        nextTransitionK:key === 'solid' ? tb : null,
        atTransition,
        transition:key === 'solid' ? 'sublimation' : 'gas',
        boundaryTransition:atTransition ? 'sublimation' : null,
        boundaryK:atTransition ? tb : null
      };
    }
    const atMelting = Math.abs(temperatureK - tm) < 0.5;
    const atBoiling = Math.abs(temperatureK - tb) < 0.5;
    const boundaryTransition = atMelting ? 'melting' : atBoiling ? 'boiling' : null;
    const progress = key === 'solid'
      ? temperatureK / Math.max(1,tm)
      : key === 'liquid'
        ? (temperatureK - tm) / Math.max(1,tb - tm)
        : 1;
    return {
      key,
      progress:Math.max(0,Math.min(1,progress)),
      nextTransitionK:key === 'solid' ? tm : key === 'liquid' ? tb : null,
      atTransition:atMelting || atBoiling,
      transition:key === 'solid' ? 'melting' : key === 'liquid' ? 'boiling' : 'gas',
      boundaryTransition,
      boundaryK:boundaryTransition === 'melting' ? tm : boundaryTransition === 'boiling' ? tb : null
    };
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

  root.NULLA_THERMODYNAMICS = Object.freeze({phaseAtTemperature,hasUsablePhaseProfile,phaseStatus,lennardJonesForceMagnitude,reducedLennardJonesPotential});
})(globalThis);
