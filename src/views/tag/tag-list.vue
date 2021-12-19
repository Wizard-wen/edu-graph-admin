<template>
  <div class="table-control">
    <div class="left"></div>
    <div class="right">
      <ant-button type="primary" @click="showCreateTagModal">创建</ant-button>
    </div>
  </div>
  <div class="table-box">
    <ant-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="tag.list"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange">
    </ant-table>
  </div>
  <create-tag-modal
    v-if="isModalVisible"
    :isModalVisible="isModalVisible"
    @close="handleModalClose"></create-tag-modal>
</template>
<script lang="ts">
import CreateTagModal from "@/views/tag/create-tag-modal.vue";
import { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { pagination, tag, TagList } from './tag.list'

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    sorter: true,
    width: '20%'
  },
];

type Pagination = TableState['pagination'];
//
// const queryData = (params: APIParams) => {
//   return `https://randomuser.me/api?noinfo&${new URLSearchParams(params)}`;
// };

export default defineComponent({
  components: { CreateTagModal },
  setup() {
    const loading = ref(false);
    const handleTableChange = (pag: Pagination, filters: TableStateFilters, sorter: any) => {
      console.log(pag, filters, sorter)
    };
    const tagList = new TagList();
    onMounted(async () => {
      await tagList.getList()
    })
    const isModalVisible = ref(false);

    function showCreateTagModal() {
      isModalVisible.value = true;
    }
    async function handleModalClose(){
      isModalVisible.value = false;
      await tagList.getList();
    }

    return {
      tag,
      pagination,
      loading,
      columns,
      handleTableChange,
      isModalVisible,
      showCreateTagModal,
      handleModalClose
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../../style/common.scss';
.custom-table {
  width: 100%;
}
</style>

