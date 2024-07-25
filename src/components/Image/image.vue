<template>
  <van-image :src="props.src">
    <template #loading>
      <div class="image_loading"></div>
    </template>
    <template v-slot:error></template>
  </van-image>
</template>

<script setup lang="ts">
  const props = defineProps({
    src: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss" scoped>
  .van-image {
    vertical-align: middle;
  }
  :deep(.van-image__loading) {
    width: 100%;
    height: 100%;
    background: inherit;
    .image_loading {
      width: 100%;
      height: 100%;
      background-color: inherit;
    }
  }
  :deep(.van-image__error) {
    width: 100%;
    height: 100%;
    background: inherit;
  }
</style>
