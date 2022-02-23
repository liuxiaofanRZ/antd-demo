<script>
export default {
  name: 'custom-tree',
  props: {
    tree: {
      type: Array,
    },
  },
  methods: {
    onChange(node) {
      node.checked = !node.checked
    },
  },
  render(h) {
    return h(
      'div',
      { class: 'custom-tree' },
      this.tree.map((node) =>
        h('div', { class: 'tree-node', key: node.value }, [
          h('div', { class: 'name' }, [
            h(
              'a-checkbox',
              {
                props: {
                  checked: node.checked,
                },
                on: {
                  change() {
                    node.checked = !node.checked
                  },
                },
              },
              node.value,
            ),
            node.children
              ? h('custom-tree', { props: { tree: node.children } })
              : '',
          ]),
        ]),
      ),
    )
  },
}
</script>

<style>
.custom-tree {
  padding-left: 20px;
}
</style>
