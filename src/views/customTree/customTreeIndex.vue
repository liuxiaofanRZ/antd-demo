<template>
  <div>
    <custom-tree :tree="tree"></custom-tree>
    <a-button @click="show">显示选择的value</a-button>
  </div>
</template>

<script>
let id = 0
export default {
  name: 'customTreeIndex',
  data() {
    return {
      tree: [
        {
          checked: false,
          value: 'node-' + id++,
          children: [
            {
              checked: false,
              value: 'node-' + id++,
              children: [
                { checked: false, value: 'node-' + id++ },
                { checked: false, value: 'node-' + id++ },
                { checked: false, value: 'node-' + id++ },
                { checked: false, value: 'node-' + id++ },
                { checked: false, value: 'node-' + id++ },
              ],
            },
            {
              checked: false,
              value: 'node-' + id++,
              children: [{ checked: false, value: 'node-' + id++ }],
            },
            {
              checked: false,
              value: 'node-' + id++,
              children: [{ checked: false, value: 'node-' + id++ }],
            },
            {
              checked: false,
              value: 'node-' + id++,
              children: [{ checked: false, value: 'node-' + id++ }],
            },
          ],
        },
        {
          checked: false,
          value: 'node-' + id++,
          children: [
            {
              checked: false,
              value: 'node-' + id++,
              children: [{ checked: false, value: 'node-' + id++ }],
            },
          ],
        },
        {
          checked: false,
          value: 'node-' + id++,
          children: [
            {
              checked: false,
              value: 'node-' + id++,
              children: [{ checked: false, value: 'node-' + id++ }],
            },
          ],
        },
      ],
    }
  },
  methods: {
    show() {
      console.log(this.tree)
      let arr = []

      const s = (list) => {
        if (!list || !(list instanceof Array)) return
        list.forEach((node) => {
          if (node.checked) arr.push(node)
          s(node.children)
        })
      }
      s(this.tree)
      console.log(arr.map((item) => item.value))
    },
  },
}
</script>

<style></style>
