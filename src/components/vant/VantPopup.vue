<template>
  <van-popup
    v-model:show="isShow"
    :overlay="overlay"
    :position="position"
    :overlay-class="overlayClass"
    :duration="duration"
    :z-index="zIndex"
    :round="round"
    :lock-scroll="lockScroll"
    :lazy-render="lazyRender"
    :close-on-popstate="closeOnPpopstate"
    :close-on-click-overlay="closeOnClickOverlay"
    :closeable="closeable"
    :close-icon="closeIcon"
    :close-icon-position="closeIconPosition"
    :before-close="beforeClose"
    :icon-prefix="iconPrefix"
    :transition="transition"
    :transition-appear="transitionAappear"
    :teleport="teleport"
    :safe-area-inset-top="true"
    :safe-area-inset-bottom="true"
    @click="onClick"
    @click-overlay="clickOverlay"
    @click-close-icon="clickCloseIcon"
    @open="open"
    @close="close"
    @opened="opened"
    @closed="closed"
  >
    <!-- 自定义展示面板的展示内容插槽 -->
    <template #default>
      <slot name="default"></slot>
    </template>
    <!-- 自定义描述文案插槽 -->
    <template #overlay-content>
      <slot name="overlay-content"></slot>
    </template>
  </van-popup>
</template>

<script setup lang="ts">
  import type { PopupPosition, PopupCloseIconPosition } from 'vant';

  const emit = defineEmits(['update:show', 'click', 'click-overlay', 'click-close-icon', 'open', 'close', 'opened', 'closed']);

  const props = withDefaults(
    defineProps<{
      show: boolean;
      //是否显示遮罩层
      overlay?: boolean;
      //弹出位置，可选值为 top bottom right left 默认值center
      position?: PopupPosition;
      //自定义遮罩层类名
      overlayClass?: string | Array<string> | object;
      //动画时长，单位秒，设置为 0 可以禁用动画
      duration?: number | string;
      //将弹窗的 z-index 层级设置为一个固定值
      zIndex?: number | string;
      //是否显示圆角
      round?: boolean;
      //是否锁定背景滚动
      lockScroll?: boolean;
      //是否在显示弹层时才渲染节点
      lazyRender?: boolean;
      //是否在页面回退时自动关闭
      closeOnPpopstate?: boolean;
      //是否在点击遮罩层后关闭
      closeOnClickOverlay?: boolean;
      //是否显示关闭图标
      closeable?: boolean;
      //关闭图标名称或图片链接，等同于 Icon 组件的 name 属性
      closeIcon?: string;
      //关闭图标位置，可选值为 top-left bottom-left bottom-right 默认为top-right
      closeIconPosition?: PopupCloseIconPosition;
      //关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise
      beforeClose?: (action: string) => boolean | Promise<boolean>;
      //图标类名前缀，等同于 Icon 组件的 class-prefix 属性
      iconPrefix?: string;
      //动画类名，等价于 transition 的 name 属性
      transition?: string;
      //是否在初始渲染时启用过渡动画
      transitionAappear?: boolean;
      //指定挂载的节点，等同于 Teleport 组件的 to 属性
      teleport?: string | Element;
    }>(),
    {
      overlay: true,
      position: 'center',
      duration: 0.3,
      round: true,
      lockScroll: true,
      lazyRender: true,
      closeOnPopstate: false,
      closeOnClickOverlay: true,
      closeable: false,
      transitionAppear: false,
    },
  );

  //双向绑定语法糖
  const isShow = computed({
    get() {
      return props.show;
    },
    set(value) {
      emit('update:show', value);
    },
  });

  //点击弹出层时触发
  const onClick = (event: MouseEvent) => {
    emit('click', event);
  };

  //点击遮罩层时触发
  const clickOverlay = (event: MouseEvent) => {
    emit('click-overlay', event);
  };

  //点击关闭图标是触发
  const clickCloseIcon = (event: MouseEvent) => {
    emit('click-close-icon', event);
  };

  //打开弹出层时立即触发
  const open = () => {
    emit('open');
  };

  //关闭弹出层时立即触发
  const close = () => {
    emit('close');
  };

  //打开弹出层且动画结束后触发
  const opened = () => {
    emit('opened');
  };

  //关闭弹出层且动画结束后触发
  const closed = () => {
    emit('closed');
  };
</script>

<style lang="scss" scoped></style>
