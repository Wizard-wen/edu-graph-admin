<template>
  <ant-modal
    title="创建标签"
    v-if="isModalVisible"
    okText="创建"
    cancelText="取消"
    :visible="isModalVisible"
    :confirm-loading="confirmLoading"
    @ok="handleCreateTag"
    @cancel="handleClose">
    <ant-input v-model:value="tagName" placeholder="请输入标签名称"></ant-input>
  </ant-modal>
</template>

<script setup lang="ts">
import { TagList } from "@/views/tag/tag.list";
import { defineProps, defineEmits, ref } from 'vue';

defineProps({
  isModalVisible: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['close'])
const tagList = new TagList();
const confirmLoading = ref(false);
const tagName = ref('');

async function handleCreateTag() {
  await tagList.createTag(tagName.value);
  await emit('close');
}

function handleClose() {
  emit('close')
}
</script>

<style scoped>

</style>
