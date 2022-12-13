import apis from '~/api/apis'

export default (ctx, inject) => {
  inject('apis', apis(ctx.$axios))
}
