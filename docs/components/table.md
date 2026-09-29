# Table 表格

配置式表格：`columns` 描述列，`data` 提供行。支持本地排序、多选、序号列（**以汉字数字标序**）、斑马纹、固定表头、单元格插槽与空状态。

## 基础用法

<Demo src="table/basic">

<<< @/examples/table/basic.vue

</Demo>

## 多选与自定义单元格

通过 `#cell-{prop}` 插槽自定义单元格，`selectable` 开启多选。

<Demo src="table/custom">

<<< @/examples/table/custom.vue

</Demo>

## API

### Table 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| data | 数据 | `any[]` | `[]` |
| columns | 列配置 | `TableColumn[]` | `[]` |
| row-key | 行唯一键 | `string \| (row) => key` | — |
| stripe | 斑马纹 | `boolean` | `false` |
| border | 竖向分隔线 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| selectable | 多选列 | `boolean` | `false` |
| show-index | 汉字序号列 | `boolean` | `false` |
| highlight-current-row | 高亮当前行 | `boolean` | `false` |
| max-height | 最大高度（表头吸顶） | `string \| number` | — |
| empty-text | 空数据文案 | `string` | `'还没有数据呢'` |
| loading | 加载中 | `boolean` | `false` |
| default-sort | 默认排序 | `{ prop, order }` | — |

### TableColumn

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| prop | 字段，支持 `a.b` | `string` | — |
| label | 表头 | `string` | — |
| width / minWidth | 列宽 | `number \| string` | — |
| align | 对齐 | `'left' \| 'center' \| 'right'` | — |
| sortable | 可排序或自定义比较函数 | `boolean \| (a, b) => number` | — |
| formatter | 格式化 | `(row, column, value, index) => string` | — |
| fixed | 固定列 | `'left' \| 'right'` | — |
| ellipsis | 超出省略 | `boolean` | — |

### Table 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| row-click | 点击行 | `(row, index, e)` |
| selection-change | 选择变化 | `(rows)` |
| sort-change | 排序变化 | `({ prop, order })` |
| current-change | 当前行变化 | `(row)` |

### Table 插槽

| 插槽 | 说明 |
|---|---|
| cell-{prop} | 自定义单元格，参数 `{ row, column, index, value }` |
| header-{prop} | 自定义表头 |
| empty | 空状态 |

### Table 方法

| 方法 | 说明 | 参数 |
|---|---|---|
| clearSelection | 清空选择 | — |
| toggleRowSelection | 切换某行选择 | `(row)` |
| getSelectionRows | 获取已选行 | — |
| clearSort | 清除排序 | — |

