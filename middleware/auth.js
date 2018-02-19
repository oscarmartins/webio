export default function (ctx) {
  const { store, error } = ctx
    if (!store.state.authUser) {
      console.log(ctx.app.context.$axios.defaults.headers)
      error({
        message: 'You are not connected',
        statusCode: 403
      })
    }
  }