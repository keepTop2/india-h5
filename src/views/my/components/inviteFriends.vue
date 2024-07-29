<template>
	<div>
		<van-popup v-model:show="inviteFriendsShow" position="bottom">
			<header>
				<span class="label">登出</span>
				<SvgIcon class="close_icon" iconName="/common/close" @click="inviteFriendsShow = false" />
			</header>
			<div class="content">您确定要退出登录吗?</div>
			<div class="btns">
				<div class="btn1" @click="inviteFriendsShow = false">取消</div>
				<div class="btn2">登出</div>
			</div>
		</van-popup>
	</div>
</template>

<script setup lang="ts">
const inviteFriendsShow = ref(false);
</script>

<style scoped></style>
