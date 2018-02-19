
export default (ctx) => {

    const {store, $axios} = ctx
    const axios = $axios

    //axios.defaults.baseURL = {API endpoint}
        
    if (process.server) {
      return
    }

    axios.interceptors.request.use(request => {
      //request.baseURL = {API endpoint}     
      
      // Get token from auth.js store 
      const token = store.getters['token']
      
      // Update token axios header
      if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`
      }
      console.log(token)      
      return request
    })
}
