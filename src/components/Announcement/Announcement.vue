<template>
  <Popup v-for="item in noticeList" :item="item"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Popup from "./Popup.vue";
import HomeApi from "/@/api/home";

interface Notice {
  noticeTitleI18nCode: string; // 标题
  messageContentI18nCode: string; // 内容
}

const noticeList = ref<Notice[]>([]);
const getNoticeList = async () => {
  const res = await HomeApi.noticeList();
  noticeList.value = res.data.userNoticeList;
};
getNoticeList();
</script>

<style scoped lang="scss"></style>
