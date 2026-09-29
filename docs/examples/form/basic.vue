<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MoMessage, type FormRules } from 'momeng-ui'

const formRef = ref()
const form = reactive({
  name: '',
  email: '',
  city: '',
  hobbies: [] as string[],
  letter: '',
  agree: false,
})
const rules: FormRules = {
  name: [
    { required: true, message: '请写下你的名号', trigger: 'blur' },
    { min: 2, max: 8, message: '名号在 2~8 个字之间', trigger: 'blur' },
  ],
  email: [{ required: true, type: 'email', message: '邮箱格式好像不太对', trigger: 'blur' }],
  city: [{ required: true, message: '选一座城吧', trigger: 'change' }],
  hobbies: [{ required: true, message: '至少选一样雅好', trigger: 'change' }],
  agree: [{ validator: (v) => v || '需要先同意哦', trigger: 'change' }],
}
async function submit() {
  const { valid } = await formRef.value.validate()
  if (valid) MoMessage.success('信笺已寄出')
  else MoMessage.warning('还有几处没填好')
}
</script>

<template>
  <MoForm
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="84px"
    style="max-width: 520px"
    scroll-to-error
  >
    <MoFormItem label="名号" prop="name">
      <MoInput v-model="form.name" placeholder="如：东坡居士" />
    </MoFormItem>
    <MoFormItem label="邮箱" prop="email">
      <MoInput v-model="form.email" placeholder="you@example.com" />
    </MoFormItem>
    <MoFormItem label="城池" prop="city">
      <MoSelect
        v-model="form.city"
        :options="['长安', '洛阳', '临安'].map((c) => ({ label: c, value: c }))"
        style="width: 100%"
      />
    </MoFormItem>
    <MoFormItem label="雅好" prop="hobbies">
      <MoCheckboxGroup v-model="form.hobbies">
        <MoCheckbox value="琴" /><MoCheckbox value="棋" /><MoCheckbox value="书" /><MoCheckbox
          value="画"
        />
      </MoCheckboxGroup>
    </MoFormItem>
    <MoFormItem label="留言" prop="letter">
      <MoInput v-model="form.letter" type="textarea" :rows="3" />
    </MoFormItem>
    <MoFormItem prop="agree">
      <MoCheckbox v-model="form.agree">我保证以上所写皆为真心话</MoCheckbox>
    </MoFormItem>
    <MoFormItem>
      <MoButton type="primary" icon="sparkle" @click="submit">寄出</MoButton>
      <MoButton @click="formRef.resetFields()">重写</MoButton>
    </MoFormItem>
  </MoForm>
</template>
