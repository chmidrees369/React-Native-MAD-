import mockEvents from '../data/mockEvents.json';

/**
 * Recommend events based on user preferences.
 * Each event is scored by:
 *   • Number of matched tags
 *   • Popularity score (higher is better)
 *   • Recency (more recent events first)
 *
 * @param {string[]} preferences - Array of preferred tags or interests
 * @param {number} limit - Max number of recommendations (default 5)
 * @returns {Array} Recommended events
 */
export const getRecommendedEvents = (preferences = [], limit = 5) => {
  const now = Date.now();

  // Helper: compute a composite score for sorting
  const computeScore = event => {
    const tagMatches = event.tags.reduce(
      (cnt, tag) => cnt + (preferences.includes(tag) ? 1 : 0),
      0
    );
    // Normalize recency to a 0–1 range (newer events higher)
    const eventTime = new Date(event.date).getTime();
    const recencyScore = Math.max(0, 1 - (now - eventTime) / (1000 * 60 * 60 * 24 * 30)); 
    // popularityScore assumed between 0–1 or higher
    return tagMatches * 10 + (event.popularityScore || 0) + recencyScore;
  };

  // If no preferences, just return top trending/upcoming
  if (!preferences.length) {
    return mockEvents
      .filter(e => new Date(e.date).getTime() >= now)     // upcoming only
      .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
      .slice(0, limit);
  }

  // Score all events
  const scored = mockEvents.map(event => ({
    ...event,
    _score: computeScore(event)
  }));

  // Sort by descending score
  scored.sort((a, b) => b._score - a._score);

  // Take top <limit>
  return scored.slice(0, limit).map(({ _score, ...e }) => e);
};
