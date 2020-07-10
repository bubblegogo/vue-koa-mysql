<template>
  <div :class="['todo-item',status?'todo-item-del':'']" :contenteditable="autoeditable"  @blur="blurClick()" > {{ value }}</div>
</template>

<script>
export default {
  name: 'autoEditable',
  props: {
    id: {
      type: Number,
      default: 0
    },
    status: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    autoeditable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    blurClick() {
      if (this.$el.innerHTML.trim() !== this.value.trim()) {
        this.$emit('input', { 'id': this.id, 'content': this.$el.innerHTML })
      }
    }
  },
  watch: {
    autoeditable(newval) { // 由于监听数值的时候 需要操作dom 元素 所以需要 $nextTick
      this.$nextTick(function() {
        if (newval) {
          this.$el.focus() // 把光标移动到 最后一个位置
          var range = window.getSelection() // 创建range
          range.selectAllChildren(this.$el) // range 选择obj下所有子内容
          range.collapseToEnd()
        } else {
          this.$el.blur() // 把光标移动到 最后一个位
        }
      })
    }
  }
}
</script>

<style scoped>

  .todo-item {
    font-size: 14px;
    cursor: pointer;
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }
</style>
