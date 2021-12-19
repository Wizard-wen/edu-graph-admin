<template>
  <div>
    <ant-button type="primary" @click="showCreateDomainBaseTypeModal">创建</ant-button>
  </div>
  <ant-modal
    title="创建领域基本类型"
    v-model:visible="isCreateDomainBaseTypeModalVisible"
    :confirm-loading="confirmLoading"
    @ok="handleCreateDomainBaseType">
    <ant-input v-model:value="domainBaseTypeName" placeholder="基本领域名称"></ant-input>
  </ant-modal>
  <div class="table-box">
    <ant-table :dataSource="dataSource" :columns="columns">
      <template #operation="{ record }">
        <ant-popconfirm
          v-if="dataSource.length"
          :title="record.isDeleted ? '确定恢复吗?':'确定删除吗?'"
          @confirm="onOperate(record.id, !record.isDeleted)">
          <a>{{ record.isDeleted ? '恢复' : '删除' }}</a>
        </ant-popconfirm>
      </template>
    </ant-table>
  </div>
</template>

<script lang="ts">
import { DomainBaseTypeApiService } from "@/api.service";
import { Modal } from "ant-design-vue";
import { DomainBaseTypeModelType } from "metagraph-constant";
import { defineComponent, onMounted, ref, computed } from 'vue';

export default defineComponent({
  name: "domain.base.type.list",
  setup() {
    const currentPage = ref(1);
    const total = ref(0);
    const domainBaseTypeList = ref<DomainBaseTypeModelType[]>([]);
    const getDomainBaseTypeList = async () => {
      const result = await DomainBaseTypeApiService.getList({
        pageSize: 10,
        pageIndex: currentPage.value - 1
      });
      if (result.data) {
        domainBaseTypeList.value = result.data.list;
        total.value = result.data.total
      }
    }
    const dataSource = computed(() => domainBaseTypeList.value.map(item => {

      return {
        ...item,
        status: item.isDeleted ? '已删除': '正常',
        key: item.id
      }
    }))
    const columns = ref([
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '是否删除',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
      },
    ])
    const isCreateDomainBaseTypeModalVisible = ref<boolean>(false);
    const confirmLoading = ref<boolean>(false);
    const domainBaseTypeName = ref('');
    const showCreateDomainBaseTypeModal = () => {
      isCreateDomainBaseTypeModalVisible.value = true;
    };

    const handleCreateDomainBaseType = async () => {
      confirmLoading.value = true;
      if (domainBaseTypeName.value === '') {
        confirmLoading.value = false;
        Modal.error({
          content: '名称不能为空！'
        })
      }
      await DomainBaseTypeApiService.create({
        name: domainBaseTypeName.value
      })
      confirmLoading.value = false;
      isCreateDomainBaseTypeModalVisible.value = false;
    };
    const onOperate = async (id: string, status: boolean) => {
      await DomainBaseTypeApiService.changeStatus({
        id,
        isDeleted: status
      })
      await getDomainBaseTypeList();
    }
    onMounted(async () => {
      currentPage.value = 1;
      await getDomainBaseTypeList();
    })
    return {
      dataSource,
      columns,
      showCreateDomainBaseTypeModal,
      handleCreateDomainBaseType,
      isCreateDomainBaseTypeModalVisible,
      confirmLoading,
      domainBaseTypeName,
      onOperate
    }
  }
});
</script>

<style scoped lang="scss">
.table-box {
  max-width: 1200px;
  width: 70%;
  margin: 0 auto;
}
</style>
