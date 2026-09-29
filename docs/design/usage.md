# 使用原则 · 宜与忌

这一页收集了最常见的用法对比。每一组左边是**宜**，右边是**忌**。

## 按钮

<DoDont do-text="主次分明：一个朱砂主按钮，其余默认或文字按钮。" dont-text="多个主按钮并列，视觉没有重心。">
  <template #do><MoButton type="primary" icon="sparkle">寄出</MoButton><MoButton>存草稿</MoButton></template>
  <template #dont><MoButton type="primary">寄出</MoButton><MoButton type="success">存草稿</MoButton><MoButton type="warning">预览</MoButton></template>
</DoDont>

<DoDont do-text="危险操作使用胭脂色，并二次确认。" dont-text="用朱砂主色做删除按钮，容易误触。">
  <template #do><MoButton type="danger" plain icon="delete">删除</MoButton></template>
  <template #dont><MoButton type="primary" icon="delete">删除</MoButton></template>
</DoDont>

## 装饰元素

<DoDont do-text="一张卡片只用一种装饰：胶带或印章。" dont-text="胶带、印章、墨团、爱心全堆在一起，像贴满贴纸的冰箱门。">
  <template #do><MoCard header="定风波" tape="pink" style="width:220px">一蓑烟雨任平生</MoCard></template>
  <template #dont><MoCard header="定风波 💕✨" tape="pink" seal="东坡" style="width:220px"><MoMascot :size="36" mood="love" /> 一蓑烟雨任平生 <MoTag type="primary" effect="dark">热</MoTag></MoCard></template>
</DoDont>

## 字体

<DoDont do-text="行书只用于点睛：大标题、印章、序号。" dont-text="大段正文使用行书，难以阅读。">
  <template #do><div><MoText font="brush" size="xl">赤壁赋</MoText><p style="margin:6px 0 0">壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。</p></div></template>
  <template #dont><MoText font="brush" size="lg">壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。</MoText></template>
</DoDont>

## 颜色

<DoDont do-text="桃夭色只用于腮红、爱心等萌点。" dont-text="用桃夭色写重要文字，对比度不足。">
  <template #do><MoRate :model-value="4" icon="heart" color="var(--mo-color-pink)" /></template>
  <template #dont><span style="color:var(--mo-color-pink);font-size:15px">您的订单将于今日 18:00 前发货</span></template>
</DoDont>

## 反馈

<DoDont do-text="轻操作用 Message，一句话说完。" dont-text="轻操作弹 Dialog，打断用户。">
  <template #do><MoButton size="small" icon="copy">复制</MoButton><MoText type="secondary" size="sm">→ Message「已复制」</MoText></template>
  <template #dont><MoButton size="small" icon="copy">复制</MoButton><MoText type="secondary" size="sm">→ Dialog「复制成功！」[确定]</MoText></template>
</DoDont>

## 场景选型速查

| 我想…… | 用 |
|---|---|
| 告诉用户操作成功了 | Message |
| 后台任务完成、需要用户知道但不打断 | Notification |
| 用户要做不可逆的操作 | MessageBox.confirm |
| 收集一组信息 | Dialog + Form，或 Drawer + Form（字段较多时） |
| 页面级、持续存在的提醒 | Alert |
| 解释一个图标按钮 | Tooltip |
| 在原地展示额外信息与操作 | Popover |
| 表示「完成 / 通过」的仪式感 | Seal `stamp` |
| 展示一段需要被郑重对待的文字 | Scroll |
