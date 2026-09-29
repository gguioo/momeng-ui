# Pagination 分页

当前页像**一方朱印**，稳稳地盖在页码上。

## 基础用法

<Demo src="pagination/basic">

<<< @/examples/pagination/basic.vue

</Demo>

## API

### Pagination 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| total | 总条数 | `number` | `0` |
| current-page / v-model:current-page | 当前页 | `number` | `1` |
| page-size / v-model:page-size | 每页条数 | `number` | `10` |
| page-sizes | 可选条数 | `number[]` | `[10, 20, 50, 100]` |
| pager-count | 页码按钮数（奇数） | `number` | `7` |
| layout | 布局：total, sizes, prev, pager, next, jumper | `string` | `'prev, pager, next'` |
| small | 小号 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| hide-on-single-page | 只有一页时隐藏 | `boolean` | `false` |

### Pagination 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| change | 页码或条数变化 | `(page, pageSize)` |

