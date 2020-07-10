## code Standards style
### 1.组件选项顺序
```text
  - el   副作用 (触发组件外的影响)
  - name 全局感知 (要求组件以外的知识)
  - components  模板依赖 (模板内使用的资源)
  - mixins 组合 (向选项里合并 property)
  - props
  - data
  - computed
  - watch 事件 (通过响应式事件触发的回调)
    - 生命周期钩子 (按照它们被调用的顺序)
    -- created
    -- mounted
    -- updated
    -- beforeDestroy
  - metods
  - filter
    
  

```
### 2.元素属性顺序
###### 原生属性放前面，指令放后面

```text
  - class
  - id,ref
  - name
  - data-*
  - src, for, type, href,value,max-length,max,min,pattern
  - title, alt，placeholder
  - aria-*, role
  - required,readonly,disabled
  - is
  - v-for
  - key
  - v-if
  - v-else-if
  - v-else
  - v-show
  - v-cloak
  - v-pre
  - v-once
  - v-model
  - v-bind,:
  - v-on,@
  - v-html
  - v-text

```