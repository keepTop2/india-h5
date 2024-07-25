<template>
  <van-action-sheet
    v-model:show="isShow"
    :actions="actions"
    :title="title"
    :cancel-text="cancelText"
    :description="description"
    :closeable="closeable"
    :close-icon="closeIcon"
    :duration="duration"
    :z-index="zIndex"
    :round="round"
    :overlay="overlay"
    :overlay-class="overlayClass"
    :overlay-style="overlayStyle"
    :lock-scroll="lockScroll"
    :lazy-render="lazyRender"
    :close-on-popstate="closeOnPopstate"
    :close-on-click-action="closeOnClickAction"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="true"
    :teleport="teleport"
    :before-close="beforeClose"
    @select="onSelect"
    @cancel="onCancel"
    @open="onOpen"
    @close="onClose"
    @opened="onOpened"
    @closed="onClosed"
    @click-overlay="onOverlay"
  >
    <!-- 自定义展示面板的展示内容插槽 -->
    <template #default>
      <slot name="default"></slot>
    </template>
    <!-- 自定义描述文案插槽 -->
    <template #description v-if="description">
      <slot name="description">{{ description }}</slot>
    </template>
    <!-- 自定义取消按钮内容插槽 -->
    <template #cancel v-if="cancelText">
      <slot name="cancel">{{ cancelText }}</slot>
    </template>
    <!-- 自定义选项内容 -->
    <template #action>
      <slot name="action"></slot>
    </template>
  </van-action-sheet>
</template>

<script setup lang="ts">
  import type { ActionSheetAction } from 'vant';
  const emit = defineEmits(['update:show', 'select', 'cancel', 'open', 'close', 'opened', 'closed', 'click-overlay']);

  const props = withDefaults(
    defineProps<{
      show: boolean;
      //面板选项列表
      actions?: ActionSheetAction[];
      //顶部标题
      title?: string;
      //取消按钮文字
      cancelText?: string;
      //选项上方的描述信息
      description?: string;
      //是否显示关闭图标
      closeable?: boolean;
      //关闭图标名称或图片链接，等同于 Icon 组件的 name 属性
      closeIcon?: string;
      //动画时长，单位秒，设置为 0 可以禁用动画
      duration?: number | string;
      //将面板的 z-index 层级设置为一个固定值
      zIndex?: number | string;
      //是否显示圆角
      round?: boolean;
      //是否显示遮罩层
      overlay?: boolean;
      //自定义遮罩层类名
      overlayClass?: string | Array<string> | object;
      //自定义遮罩层样式
      overlayStyle?: any;
      //是否锁定背景滚动
      lockScroll?: boolean;
      //是否在显示弹层时才渲染节点
      lazyRender?: boolean;
      //是否在页面回退时自动关闭
      closeOnPopstate?: boolean;
      //是否在点击选项后关闭
      closeOnClickAction?: boolean;
      //是否在点击遮罩层后关闭
      closeOnClickOverlay?: boolean;
      //指定挂载的节点
      teleport?: string | Element;
      beforeClose?: (action: string) => boolean | Promise<boolean>;
    }>(),
    {
      show: false,
      // cancelText: '取消',
      closeable: true,
      closeIcon: 'cross',
      duration: 0.3,
      round: true,
      overlay: true,
      lockScroll: true,
      lazyRender: true,
      closeOnPopstate: true,
      closeOnClickAction: true,
      closeOnClickOverlay: true,
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

  //点击选项时触发，禁用或加载状态下不会触发
  const onSelect = (action: ActionSheetAction, index: number) => {
    emit('select', { action, index });
  };

  //点击取消按钮时触发
  const onCancel = () => {
    emit('cancel');
  };

  //打开面板时触发
  const onOpen = () => {
    emit('open');
  };

  //关闭面板时触发
  const onClose = () => {
    emit('close');
  };

  //打开面板且动画结束后触发
  const onOpened = () => {
    emit('opened');
  };

  //关闭面板且动画结束后触发
  const onClosed = () => {
    emit('closed');
  };

  //点击遮罩层时触发
  const onOverlay = (event: MouseEvent) => {
    emit('click-overlay', event);
  };
</script>

<style lang="scss" scoped></style>
