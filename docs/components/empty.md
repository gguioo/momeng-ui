# Empty 空状态

空，不是错误，是一张**还没落笔的宣纸**。墨团会根据场景换个表情陪着你。

## 基础用法

<Demo src="empty/basic">

<<< @/examples/empty/basic.vue

</Demo>

## API

### Empty 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| description | 描述 | `string` | 这里空空的… |
| mood | 墨团表情 | `MascotMood` | `'sleepy'` |
| image | 自定义图片 | `string` | — |
| image-size | 图片尺寸 | `number` | `100` |

### Empty 插槽

| 插槽 | 说明 |
|---|---|
| default | 底部操作 |
| image | 自定义图片 |
| description | 描述 |

