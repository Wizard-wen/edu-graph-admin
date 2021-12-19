<template>
  <div class="table-box">
    <ant-table :dataSource="dataSource" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { UserApiService } from "@/api.service";
import { UserModelType } from "metagraph-constant";
import { defineComponent, onMounted, ref, computed } from 'vue';

export default defineComponent({
  name: "user.list",
  setup() {
    const currentPage = ref(1);
    const total = ref(0);
    const userList = ref<UserModelType[]>([]);
    const getPullRequestList = async () => {
      const result = await UserApiService.getList({
        pageSize: 10,
        pageIndex: currentPage.value - 1
      });
      if (result.data) {
        userList.value = result.data.list;
        total.value = result.data.total
      }
    }
    const dataSource = computed(() => userList.value.map(item => {
      return {
        ...item,
        key: item.id
      }
    }))
    const columns = ref([
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮件',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '账户类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '是否可用',
        dataIndex: 'isForbidden',
        key: 'isForbidden',
      },
    ])
    onMounted(async () => {
      currentPage.value = 1;
      await getPullRequestList();
    })
    return {
      dataSource,
      columns
    }
  }
});
</script>

<style scoped lang="scss">
.table-box{
  max-width: 1200px;
  width: 70%;
  margin: 0 auto;
}
</style>
