<script>
export default {
  name: 'learnRender',
  props: { level: { type: Number, required: true }, value: String },
  render(h) {
    return h('h' + this.level, [h('a', this.$slots.default)])
  },
}
</script>
