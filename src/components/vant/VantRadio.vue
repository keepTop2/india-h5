<template>
  <van-radio :name="name" :size="size">
    <template #icon="props">
      <img class="img_icon_vanradio" :src="props.checked ? activeIcon : inactiveIcon" :style="state.styleObj" />
    </template>
  </van-radio>
</template>

<script setup lang="ts">
  import inactiveIcon from '/@/assets/components/vant/VantRadio/inactiveIcon.png';
  import activeIcon from '/@/assets/components/vant/VantRadio/activeIcon.png';
  const props = withDefaults(
    defineProps<{
      //标识符，通常为一个唯一的字符串或数字
      name: any;
      //形状，可选值为 square
      shape?: string;
      //是否未禁用状态
      disabled?: boolean;
      //图标大小 单位px
      size?: number;
    }>(),
    {
      shape: 'round',
      disabled: false,
    },
  );
  const state = reactive({
    styleObj: {},
  });

  onMounted(() => {
    initStyle();
  });

  const initStyle = () => {
    state.styleObj['width'] = props.size + 'px';
    state.styleObj['height'] = props.size + 'px';
  };
</script>

<style lang="scss" scoped>
  .img_icon_vanradio {
    width: 38px;
    height: 38px;
  }
</style>
