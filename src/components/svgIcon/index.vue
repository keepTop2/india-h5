<template>
  <svg :style="svgStyle">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number]
  },
  width: {
    type: [String, Number]
  },
  height: {
    type: [String, Number]
  },
  color: {
    type: String
  }
});
const symbolId = computed(() => {
  const iconPath = props.iconName.split('/');
  if (iconPath.length > 2) {
    const transformedPath = iconPath.slice(0, -1).join('-') + '/' + iconPath[iconPath.length - 1];
    return `#icon/${transformedPath}`;
  }
  return `#icon/${props.iconName}`;
});
const svgStyle = computed(() => {
  const convertToVw = (value: string | number | undefined): string | undefined => {
    if (typeof value === 'string') {
      if (value.endsWith('vw')) {
        return value;
      }
      if (value.endsWith('px')) {
        const numericValue = parseFloat(value);
        return `${(numericValue / 7.5).toFixed(6)}vw`;
      }
    }
    return value ? `${value}vw` : undefined;
  };

  const size = convertToVw(props.size);
  const width = convertToVw(props.width);
  const height = convertToVw(props.height);

  return {
    width: size || width,
    height: size || height,
    color: props.color
  };
});
</script>