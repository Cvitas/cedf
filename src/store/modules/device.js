export default {
  namespaced: true,
  state: {
    collectTypes: [] // 设备类型 采集参数
  },
  mutations: {
    setCollectType(state, collectTypes) {
      state.collectTypes = collectTypes
    }
  }
}
