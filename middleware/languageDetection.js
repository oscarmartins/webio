export default function ({ route, store, isDev }) {

    console.log(store.state.language)
    let version = route.query._storyblok || isDev ? 'draft' : 'published'
    let language = route.params.language || 'oscar'
    
    store.commit('setLanguage', language)
  
    return store.dispatch('loadSettings', {version: version, language: language})
  }