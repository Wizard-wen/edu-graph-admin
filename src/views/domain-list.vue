<template>
  <ant-button @click="handleOpenCreateDomainModal('create')">创建</ant-button>
  <div class="table-box">
    <ant-table :dataSource="dataSource" :columns="columns" :pagination="false">
      <template #operation="{ record }">
        <ant-button @click="handleOpenCreateDomainModal('edit', record)">修改</ant-button>
        <ant-button @click="handleRemove(record.id)">删除</ant-button>
      </template>
    </ant-table>
    <ant-pagination
      style="margin-top: 50px;"
      v-model:current="currentPage"
      :total="total"
      @change="onPaginationChange"/>
  </div>
  <ant-modal
    v-if="isCreateDomainModalVisible"
    title="创建领域"
    v-model:visible="isCreateDomainModalVisible"
    :confirm-loading="confirmLoading"
    @ok="handleCreateDomain">
    <ant-input v-model:value="domainName" placeholder="领域名称"></ant-input>
    <ant-select style="width: 100%" v-model:value="domainBaseTypeId" :placeholder="'领域所属类别'">
      <ant-select-option v-for="item in domainBaseTypeList" :key="item.id" :value="item.id">
        {{ item.name }}
      </ant-select-option>
    </ant-select>
  </ant-modal>
</template>

<script lang="ts">
import { DomainBaseTypeApiService, DomainApiService } from "@/api.service";
import { DomainBaseTypeModelType, DomainModelType } from "metagraph-constant";
import { defineComponent, createVNode, onMounted, ref, computed } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';

export default defineComponent({
  name: "domain.list",
  setup() {
    // domain base type
    const domainBaseTypeList = ref<DomainBaseTypeModelType[]>([]);
    const getDomainBaseTypeTotalList = async () => {
      const result = await DomainBaseTypeApiService.getTotalList();
      if (result.data) {
        domainBaseTypeList.value = result.data.list;
      }
    }
    // domain
    const currentPage = ref(1);
    const total = ref(0);
    const domainList = ref<DomainModelType[]>([]);
    const getDomainList = async () => {
      const result = await DomainApiService.getList({
        pageSize: 10,
        pageIndex: currentPage.value - 1
      });
      if (result.data) {
        domainList.value = result.data.list;
        total.value = result.data.total;
      }
    }
    const onPaginationChange = async (page: number, pageSize: number) => {
      currentPage.value = page;
      await getDomainList();
    };
    const dataSource = computed(() => domainList.value.map(item => {
      return {
        ...item,
        domainBaseTypeName: item.domainBaseType?.name,
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
        title: '基础类型',
        dataIndex: 'domainBaseTypeName',
        key: 'domainBaseTypeName',
      },
      {
        title: '创建人',
        dataIndex: 'accountId',
        key: 'accountId',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
      },
    ])
    // create domain modal
    const isCreateDomainModalVisible = ref(false);
    const confirmLoading = ref(false);
    const domainName = ref<undefined | string>(undefined);
    const domainBaseTypeId = ref<undefined | string>(undefined);
    const domainId = ref<undefined | string>(undefined);
    const modalType = ref<undefined | 'create' | 'edit'>('create');
    const handleCreateDomain = async () => {
      if (domainName.value === undefined || domainBaseTypeId.value === undefined) {
        Modal.error({
          content: 'error'
        });
        return;
      }
      if (modalType.value === 'edit') {
        if (domainId.value === undefined) {
          Modal.error({
            content: 'error'
          });
          return;
        }
        await DomainApiService.update({
          domainId: domainId.value,
          domainBaseTypeId: domainBaseTypeId.value,
          name: domainName.value
        })
      } else {
        await DomainApiService.create({
          domainBaseTypeId: domainBaseTypeId.value,
          name: domainName.value
        })
      }
      isCreateDomainModalVisible.value = false;
      await getDomainList();
    }
    const handleOpenCreateDomainModal = (type: 'create' | 'edit', item?: DomainModelType) => {
      isCreateDomainModalVisible.value = true;
      domainName.value = undefined;
      domainBaseTypeId.value = undefined;
      domainId.value = undefined;
      console.log(item ?? '');
      if (item) {
        domainName.value = item.name;
        domainBaseTypeId.value = item.domainBaseTypeId;
        domainId.value = item.id;
      }
    }
    const handleRemove = (id: string) => {
      Modal.warning({
        title: '确定删除当前Domain吗？',
        content: 'domain一旦被删除将不可恢复。',
        icon: createVNode(ExclamationCircleOutlined),
        async onOk() {
          await DomainApiService.remove({ domainId: id });
          await getDomainList();
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() {},
      });
    }
    onMounted(async () => {
      currentPage.value = 1;
      await getDomainBaseTypeTotalList();
      await getDomainList();
    })
    return {
      dataSource,
      columns,
      isCreateDomainModalVisible,
      confirmLoading,
      handleCreateDomain,
      domainName,
      domainBaseTypeId,
      domainBaseTypeList,
      handleOpenCreateDomainModal,
      handleRemove,
      onPaginationChange,
      currentPage,
      total
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
