# 设计原则

当两个方案难以取舍时，按下面五条的**先后顺序**做判断。

## 一、清楚先于可爱

可爱不能以牺牲可读性、可用性为代价。

- 所有可交互元素都有清晰的边界（2px 墨线）和明确的状态变化。
- 装饰性动效不能遮挡内容、不能拖慢操作；关键操作路径上**不放**墨团。
- 错误信息必须说清「发生了什么 + 怎么办」，可爱的语气只是包装。

<DoDont do-text="错误提示说清原因与办法，语气温和。" dont-text="只卖萌不说事，用户不知道哪里错了。">
  <template #do><MoAlert type="danger" title="邮箱格式不对" description="请检查是否漏了 @ 符号，例如 name@example.com" :closable="false" /></template>
  <template #dont><MoAlert type="danger" title="呜呜呜出错啦 (｡•́︿•̀｡)" :closable="false" /></template>
</DoDont>

## 二、秩序托住个性

手绘的不规则只发生在**形状的细节**上，布局本身必须整齐。

- 对齐到 4px 网格；同一行控件高度一致（28 / 36 / 44）。
- 不规则圆角的方向在同类组件中保持一致，不随机。
- 倾斜（印章、徽章、当前页）只使用 **−6° ~ 6°** 的小角度。

## 三、朱砂要省着用

**一屏之内，只有一个最重要的朱砂色行动点。** 次要操作使用默认按钮、素雅按钮或文字按钮。

<DoDont do-text="一个主按钮，其余为次要。" dont-text="满屏朱砂，用户不知道该点哪个。">
  <template #do><MoButton type="primary">提交</MoButton><MoButton>暂存</MoButton><MoButton text>取消</MoButton></template>
  <template #dont><MoButton type="primary">提交</MoButton><MoButton type="primary">暂存</MoButton><MoButton type="primary">取消</MoButton></template>
</DoDont>

## 四、反馈要有温度

每个操作都应该得到回应，回应的「体感」与操作的分量匹配：

| 操作分量 | 反馈方式 | 例子 |
|---|---|---|
| 轻 | 组件自身的微动效 | 按钮按下、勾选一笔写出 |
| 中 | Message 消息 | 保存成功、复制成功 |
| 重 | Notification / Dialog | 异步任务完成、删除确认 |
| 仪式感 | 印章盖章动画 `stamp` | 审批通过、打卡完成 |

## 五、尊重每一个人

- 色彩对比度满足 WCAG AA（正文 ≥ 4.5:1）。
- 所有组件可用键盘完成操作，焦点可见（朱砂虚线圈）。
- 尊重系统的「减少动态效果」设置，自动关闭非必要动画。
- 不用颜色作为唯一的信息载体：状态同时有图标或文字。
