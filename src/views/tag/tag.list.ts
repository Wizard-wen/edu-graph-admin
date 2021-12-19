/**
 * @author songxiwen
 * @date  2021/12/19 13:17
 */

import { computed, reactive } from 'vue';
import { TagApiTest } from "@/api.service";
import { message } from 'ant-design-vue';

export const tag = reactive<{
  list: any[];
  total: number;
  pageSize: number;
  pageIndex: number;
}>({
  list: [],
  total: 0,
  pageSize: 20,
  pageIndex: 0
});

export const pagination = computed(() => ({
  total: tag.total,
  current: tag.pageIndex,
  pageSize: tag.pageSize,
}));

export class TagList {
  async getList(): Promise<void> {
    const result = await TagApiTest.getList({
      pageSize: pagination.value.pageSize,
      pageIndex: pagination.value.current
    });
    if (result.data) {
      tag.list = result.data.list;
      tag.total = result.data.total
    }
  }

  async createTag(name: string): Promise<void> {
    const result = await TagApiTest.create({
      name
    });
    if (result.data) {
      message.success('success')
    }
  }
}
