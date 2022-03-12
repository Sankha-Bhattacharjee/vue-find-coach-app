export default {
  getCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters){
    const coaches = getters.getCoaches;
    const userId = rootGetters.getUserId;
    return coaches.some(coach => coach.id === userId);
  }
};
