export const calculateLevelInfo = (points: number) => {
    let level = 1;
    let xpForNextLevel = 200; // XP to reach level 2
    let totalXpForCurrentLevel = 0;
    
    // Cap the level at 100
    while (points >= totalXpForCurrentLevel + xpForNextLevel && level < 100) {
      totalXpForCurrentLevel += xpForNextLevel;
      level++;
      // Increase XP needed for next level with a curve
      xpForNextLevel = Math.floor(200 * Math.pow(level, 1.2));
    }

    const currentLevelProgressXp = points - totalXpForCurrentLevel;
    
    // For level 100, progress is always 100%
    const progressPercentage = level === 100 ? 100 : Math.min(100, (currentLevelProgressXp / xpForNextLevel) * 100);

    return {
      level,
      progressPercentage,
      currentLevelProgressXp,
      xpForNextLevel,
    };
};
