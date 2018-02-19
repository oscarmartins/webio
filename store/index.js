import api from '../api/apiroles'
export const state = () => ({
  authUser: null,
  token: null
})

export const mutations = {
  SET_USER: function (state, user) {
    debugger
    Object.keys(user)
    .filter(key => ['password'].includes(key))
    .forEach(key => delete user[key]);
    debugger
    state.authUser = user
  },
  SET_TOKEN: function (state, token) {
    state.token = token
    this.$axios.setToken(token,'Bearer')
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req, app }) {
    if (req.session) {
      console.log(req.session)
      if (req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const parameters = api.login({email: email, password: password})
      const { data } = await this.$axios.post('/api/login', {username: email, password: password})
      commit('SET_USER', data.profile)
      commit('SET_TOKEN', data.access_token)
      setTimeout((r)=>{r.push({ name: 'secret', params: { userId: data.profile._id }})},1500,this.$router);
      

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        if (error.response.status === 500 || 
            error.response.status === 403 || 
            error.response.status === 400 && 
            error.response.data) {
          throw new Error(error.response.data.error)
        }        
      }
      throw error
    }
  },

  async logout({ commit }) {
    await $axios.post('/api/logout')
    commit('SET_USER', null)
    commit('SET_TOKEN', null)

  }

}