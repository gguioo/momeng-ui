# ConfigProvider 全局配置

为一片区域统一设置**尺寸、层级、主题、工整模式和设计变量**。它是墨萌「可主题化」能力的入口。

## 局部主题

`tokens` 覆盖设计变量（会自动重算梯度色），`theme` 切换墨夜，`tidy` 关闭手绘抖动。

<Demo src="config-provider/basic">

<<< @/examples/config-provider/basic.vue

</Demo>

## API

### ConfigProvider 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| size | 全局尺寸 | `'small' \| 'default' \| 'large'` | — |
| z-index | 弹层初始层级 | `number` | `2000` |
| theme | 局部主题 | `'light' \| 'dark'` | — |
| tidy | 工整模式 | `boolean` | `false` |
| tokens | 覆盖设计变量，键名省略 `--mo-` 前缀 | `Record<string, string>` | — |
| tag | 渲染标签 | `string` | `'div'` |

