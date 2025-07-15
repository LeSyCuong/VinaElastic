export const hyperspeedPresets = {
  one: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "LongRaceDistortion",
    length: 400,
    roadWidth: 10,
    islandWidth: 5,
    lanesPerRoad: 2,
    fov: 90,
    fovSpeedUp: 10,
    speedUp: 0.1,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 70,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5] as [number, number],
    lightStickHeight: [1.3, 1.7] as [number, number],
    movingAwaySpeed: [60, 80] as [number, number],
    movingCloserSpeed: [-120, -160] as [number, number],
    carLightsLength: [400 * 0.05, 400 * 0.15] as [number, number],
    carLightsRadius: [0.05, 0.14] as [number, number],
    carWidthPercentage: [0.3, 0.5] as [number, number],
    carShiftX: [-0.2, 0.2] as [number, number],
    carFloorSeparation: [0.05, 1] as [number, number],
    colors: {
      roadColor: 0x0f0f0f, // "#0f0f0f"
      islandColor: 0x0f0f0f, // "#0f0f0f"
      background: 0x0f0f0f, // "#0f0f0f"
      shoulderLines: 0x1f2937,
      brokenLines: 0x1f2937,
      leftCars: [0x3b82f6, 0x2563eb, 0x1e40af],
      rightCars: [0x38bdf8, 0x0ea5e9, 0x0284c7],
      sticks: 0x60a5fa,
    },
  },
};
