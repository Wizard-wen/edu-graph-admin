<template>
  user list
</template>

<script lang="ts">
import type { PullRequestModelType } from "metagraph-constant";
import { defineComponent, onMounted, ref } from 'vue';
import { PullRequestApiService } from "../../api.service";

export default defineComponent({
  name: "pull.request.list",
  setup() {
    const currentPage = ref(1);
    const total = ref(0);
    const pullRequestList = ref<PullRequestModelType[]>([]);
    const getPullRequestList = async () => {
      const result = await PullRequestApiService.getList({
        pageSize: 10,
        pageIndex: currentPage.value - 1
      });
      if (result.data) {
        pullRequestList.value = result.data.list;
        total.value = result.data.total
      }
    }
    onMounted(async () => {
      currentPage.value = 1;
      await getPullRequestList();
    })
  }
});
</script>

<style scoped>

</style>
