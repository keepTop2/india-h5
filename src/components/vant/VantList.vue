<!-- 下拉刷新列表组件 -->
<template>
  <van-pull-refresh :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText"
    :success-text="successText" :disabled="state.disabled" v-model:modelValue="isDownloading" @refresh="onRefresh"
    @change="onChange">
    <template #default>
      <van-list v-model:loading="isListLoading" v-model:error="isError" :finished="finished"
        :loading-text="listLoadingText" :finished-text="finishedText" :error-text="errorText"
        :immediate-check="immediateCheck" :disabled="listDisabled" @load="onLoad">
        <!-- 列表内容插槽 -->
        <slot name="default"></slot>

        <!-- 加载中提示插槽 -->
        <template #loading>
          <slot name="loading">
            <div class="loading_container">
              <div>
                <img class="loadingImg" :src="lodingGif" alt="" />
              </div>

              <span>加载中...</span>
            </div>
          </slot>
        </template>
      </van-list>
    </template>

    <!-- 下拉提示插槽 -->
    <template #pulling>
      <slot name="pulling">
        <div>释放即可刷新...</div>
      </slot>
    </template>
    <!-- 加载中提示插槽 -->
    <template #loading>
      <slot name="loading">
        <div class="loading_container">
          <div>
            <img class="loadingImg" :src="lodingGif" alt="" />
          </div>

          <span>加载中...</span>
        </div>
      </slot>
    </template>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import lodingGif from '/@/assets/common/loding.gif';
const emit = defineEmits(['update:modelValue', 'update:listLoading', 'update:error', 'refresh', 'change', 'load']);
const props = withDefaults(
  defineProps<{
    //是否处于下拉加载中状态
    modelValue: boolean;
    //列表是否处于加载状态，加载过程中不触发 load 事件
    listLoading: boolean;
    //是否加载失败，加载失败后点击错误提示可以重新触发 load 事件
    error: boolean;
    //下拉过程提示文案
    pullingText?: string;
    //释放过程提示文案
    loosingText?: string;
    //加载过程提示文案
    loadingText?: string;
    //刷新成功提示文案
    successText?: string;
    // //是否禁用下拉刷新
    // disabled?: boolean;
    //是否已加载完成，加载完成后不再触发 load 事件
    finished?: boolean;
    //列表加载过程中的提示文案
    listLoadingText?: string;
    //加载完成后的提示文案
    finishedText?: string;
    //加载失败后的提示文案
    errorText?: string;
    //是否在初始化时立即执行滚动位置检查
    immediateCheck?: boolean;
    //是否禁用滚动加载
    listDisabled?: boolean;
  }>(),
  {
    finished: false,
    finishedText: '已经全部加载完毕',
    errorText: '请求失败，点击重新加载',
    immediateCheck: true,
    disabled: false,
    listDisabled: false,
  },
);

onBeforeMount(() => {
  initLoadCount();
});

onBeforeUnmount(() => {
  clearLoadCount();
});

//是否处于下拉加载v-model
const isDownloading = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

//列表是否处于加载状态，加载过程中不触发 load 事件 v-model
const isListLoading = computed({
  get() {
    return props.listLoading;
  },
  set(value) {
    emit('update:listLoading', value);
  },
});

const isError = computed({
  get() {
    return props.error;
  },
  set(value) {
    emit('update:error', value);
  },
});

const state = reactive({
  disabled: false,
  loadCount: 0,
});
watch([() => isDownloading.value, () => isListLoading.value, () => isError], ([newIsDownloading, newIsListLoading]) => {
  // console.log(newIsDownloading, '下拉刷新状态改变');
  // console.log(newIsListLoading, '上拉加载更多状态改变');
  if (newIsListLoading) {
    state.disabled = true;
  } else {
    state.disabled = false;
  }
});

//下拉刷新时触发
const onRefresh = () => {
  console.log('下拉刷新时触发');
  emit('refresh');
};

//拖动时或状态改变时触发
const onChange = () => {
  console.log('拖动时或状态改变时触发');
  emit('change');
};

//滚动条与底部距离小于 offset 时触发
const onLoad = () => {
  // console.log('滚动条与底部距离小于 offset 时触发', state.loadCount);
  //vant4 immediateCheck为false 失效bug 解决方案
  if (state.loadCount == 0 && props.immediateCheck == false) {
    state.loadCount++;
    localStorage.setItem('loadCount', String(state.loadCount));
    isListLoading.value = false;
    return;
  }
  state.loadCount++;
  localStorage.setItem('loadCount', String(state.loadCount));
  emit('load');
};

//vant4 immediateCheck为false 失效bug 解决方案
const initLoadCount = () => {
  if (localStorage.getItem('loadCount')) {
    state.loadCount = Number(localStorage.getItem('loadCount'));
  } else {
    localStorage.setItem('loadCount', '0');
  }
};

const clearLoadCount = () => {
  localStorage.removeItem('loadCount');
};
</script>

<style lang="scss" scoped>
.loading_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loadingImg {
  width: 40px;
}
</style>
