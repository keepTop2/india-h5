<template>
	<van-action-sheet v-model:show="show" @close="cancel">
		<div class="content">
			<div class="flex header">
				<div @click="cancel">
					<svg-icon iconName="common/close" size="30px"></svg-icon>
				</div>
				<div class="color_TB fs_32">语言切换</div>
				<div></div>
			</div>

			<div class="langList">
				<div v-for="item in filterSearch" class="langItem flex" :class="currentActiveLang === item.code ? ' active' : ''" @click="setActive(item)">
					<div class="flex">
						<img :src="item.iconFileUrl" alt="" />
						{{ item.name }}
					</div>
					<div>
						<svg-icon :iconName="currentActiveLang === item.code ? 'common/circle_theme' : 'common/circle'" size="30px"></svg-icon>
					</div>
				</div>
			</div>
		</div>
	</van-action-sheet>
</template>

<script setup lang="ts">
import CommonApi from "/@/api/common";
import { useUserStore } from "/@/store/modules/user";
const userStore = useUserStore();
const langList: any = ref([]);
const props = defineProps({
	modelValue: Boolean,
});
const show = ref(false);
const currentActiveLang = ref(userStore.getlangInfo.code);
const currentLangInfo: any = ref({});

watch(
	() => props.modelValue,
	() => {
		if (props.modelValue) {
			show.value = true;
			currentActiveLang.value = userStore.getlangInfo.code;
		} else {
			show.value = false;
		}
	}
);
const emit = defineEmits(["update:modelValue"]);
const cancel = () => {
	emit("update:modelValue", false);
	show.value = false;
};
const searchValue = ref("");

const filterSearch = computed(() => {
	if (!searchValue.value) return userStore.getlangList;
	return userStore.getlangList.filter((item: any) => item.name.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase())).map((item: any) => item);
});
const setActive = async (value) => {
	currentLangInfo.value = value;
	currentActiveLang.value = value.code;
	await userStore.setlangInfo(currentLangInfo.value);
	location.reload();
	cancel();
};
const confirm = async () => {
	await userStore.setlangInfo(currentLangInfo.value);
	location.reload();
	cancel();
};
</script>
<style lang="scss"></style>
<style scoped lang="scss">
.van-popup {
	@include themeify {
		background: themed("BG1");
	}
}
.content {
	min-height: 70vh;
	@include themeify {
		background: themed("BG1");
	}
	.header {
		padding: 20px 48px;
		@include themeify {
			color: themed("T1");
			font-size: 30px;
			border-bottom: 1px solid themed("Line");
		}
	}
	.search {
		margin: 12px 44px;
		height: 64px;
	}
	.langList {
		padding: 0 48px;
		margin-top: 30px;
	}
	.langItem {
		display: flex;
		height: 76px;
		display: flex;
		align-items: center;
		gap: 16px;
		position: relative;
		@include themeify {
			color: themed("T1");
			font-size: 28px;
		}
		img {
			width: 32px;
			height: 32px;
			border-radius: 50%;
		}
	}
	.active::after {
		border: none;
		content: "";
		position: absolute;
		z-index: 100;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 2px;
		@include themeify {
			background: themed("Line2");
		}
	}

	.active::before {
		border: none;
		content: "";
		position: absolute;
		z-index: 100;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 2px;
		@include themeify {
			background: themed("Line2");
		}
	}
}
</style>
