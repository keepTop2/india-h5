<template>
	<div class="content">
		<van-dropdown-menu>
			<van-dropdown-item @open="handleOpen" @closed="handleClose" :title="eventsList?.[0]?.leagueName" ref="itemRef">
				<ul>
					<li v-for="i in eventsList" @click="handleChangeEvent(i.eventId)" :key="i.eventId">
						<div class="teams">
							<div>
								<div class="team1">
									<div class="teamLogo">
										<img v-if="i?.teamInfo?.homeIconUrl" :src="i?.teamInfo?.homeIconUrl" alt="" />
									</div>
									<div class="teamName fs_26 color_TB fw_400">{{ i?.teamInfo?.homeName }}</div>
								</div>
								<div class="time">
									<div v-if="i.eventStatus == 'running'">
										<div class="date fs_24 color_TB fw_600">{{ timeFormate(i.globalShowTime).date }}</div>
										<div class="time fs_50 color_TB fw_700">{{ timeFormate(i.globalShowTime).time }}</div>
									</div>
								</div>
								<div class="team2">
									<div class="teamLogo">
										<img v-if="i?.teamInfo?.awayIconUrl" :src="i?.teamInfo?.awayIconUrl" alt="" />
									</div>
									<div class="teamName fs_26 color_TB fw_400">{{ i?.teamInfo?.awayName }}</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</van-dropdown-item>
		</van-dropdown-menu>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { timeFormate } from "/@/views/venueHome/sports/utils/commonFn";
const itemRef = ref();
interface events {
	eventId: number;
	leagueName: string;
	eventName: string;
	eventTime: string;
	globalShowTime: string;
	eventStatus: string | number;
	teamInfo: {
		awayName: string;
		homeName: string;
		homeIconUrl: string;
		awayIconUrl: string;
	};
}

const props = defineProps({
	eventsList: {
		type: Array<events>,
		default: () => {
			return [];
		},
	},
});
const emit = defineEmits(["changeEvent", "handleClose", "handleOpen"]);

onMounted(() => {
	console.log("Component mounted");
});

const handleChangeEvent = (eventId) => {
	itemRef?.value.toggle();
	emit("changeEvent", eventId);
};

const handleClose = () => {
	emit("handleClose");
};
const handleOpen = () => {
	emit("handleOpen");
};
</script>

<style scoped lang="scss">
@import "../style.scss";
</style>
