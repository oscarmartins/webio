/**
export default function ({store }) {
    console.log('middle')
    if (process.browser) {
        console.log('plugins persistencejs: process.browser')
    }
	if (!process.client) {
        console.log('persistencejs: !isClient')
		return;
    }
    console.log('persistencejs: setItem' + JSON.stringify(store.state.test))
	localStorage.setItem('test', JSON.stringify(store.state.test));
}
 */
import createPersistedState from 'vuex-persistedstate'

export default ({store, isHMR}) => {
    
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) return
  console.log('createPersistedState',store.state)
  if (process && process.client) {
    console.log('window.onNuxtReady')
    window.onNuxtReady((nuxt) => {
        debugger
       createPersistedState()(store) // vuex plugins can be connected to store, even after creation
    })
  }  
}