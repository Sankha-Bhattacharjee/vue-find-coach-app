export default {
  getCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    const coaches = getters.getCoaches;
    const userId = rootGetters.getUserId;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimstamp = new Date().getTime();
    const diff = (currentTimstamp - lastFetch) / 1000;
    return diff > 60;
  },
};
