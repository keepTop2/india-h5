<template>
	<div class="gameList">
		<template v-for="(item, index) in gameList" :key="index">
			<GameCard v-if="index < 3" :CardItem="item" />
		</template>
	</div>
</template>

<script setup lang="ts">
defineProps({
	gameList: {
		type: Array,
		required: true,
	},
});
</script>

<style lang="scss">
.gameList {
	// display: flex;
	// gap: 21px;
	display: grid;
	grid-template-columns: repeat(3, 31.5%);
	justify-self: center;
	grid-column: 1/-1;
	// justify-items: center;
	grid-column-gap: 21px;
	grid-row-gap: 21px;
}
</style>
