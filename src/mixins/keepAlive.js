export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    addCachedView({ to }, callback = () => {
    }) { // 添加缓存
      this.$store.dispatch('keepAlive/AddCachedView', to)
    },
    deleteCachedView({ to, from }, callback = () => {
    }) { // 删除缓存
      let keepAlive = from.meta.keepAlive || []
      if (keepAlive.indexOf(to.name) === -1) {
        this.$store.dispatch('keepAlive/DeleteCachedView', from)
        callback()
      }
    }
  },
  watch: {}
}
