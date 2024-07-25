<template>
	<div class="tabs">
		<nav ref="nav">
			<ul>
				<li v-for="(tab, index) in tabs" :key="index">
					<span :class="{ active: index == active }" @click="handleClick(index, $event, tab)">
						{{ tab.label }}
					</span>
				</li>
			</ul>
			<div class="line" ref="line"></div>
		</nav>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";

const nav = ref<HTMLElement | null>(null);
const line = ref<HTMLElement | null>(null);
const pos = ref(0);
const wid = ref(0);
const animateClass = ref("");
const active = ref(0);

interface Tab {
	label: string;
}

const props = defineProps({
	activeIndex: {
		type: String || Number,
		required: true,
	},
	code: {
		type: String || Number,
		default: "code",
		required: false,
	},
	tabs: {
		type: Array as () => Tab[],
		required: true,
	},
});

const emit = defineEmits(["update:activeIndex", "tabClick"]);

onMounted(() => {
	const navElement = nav.value;
	const lineElement = line.value;
	const activeSpan = navElement?.querySelectorAll("ul li span")[active.value];

	if (activeSpan) {
		pos.value = activeSpan.offsetLeft;
		wid.value = activeSpan.offsetWidth;
		lineElement?.style.setProperty("left", `${pos.value}px`);
		lineElement?.style.setProperty("width", `${wid.value}px`);
	}
});

const handleClick = (index: number, event: MouseEvent, tab) => {
	if (animateClass.value === "") {
		animateClass.value = "animate";
		const navElement = nav.value;
		const activeElement = navElement?.querySelector(".active");
		const lineElement = line.value;
		navElement?.querySelectorAll("ul li span").forEach((span) => {
			span.classList.remove("active");
		});
		const spanElement = (event.target as HTMLElement).closest("span");
		if (spanElement) {
			const position = spanElement.offsetLeft;
			const width = spanElement.offsetWidth;
			if (activeElement && lineElement) {
				if (position >= pos.value) {
					if (tab[props.code]) {
						emit("update:activeIndex", tab[props.code]);
					} else {
						emit("update:activeIndex", index);
					}
					emit("tabClick");
					animateLine(lineElement, { width: position - pos.value + width }, 300, () => {
						animateLine(lineElement, { width, left: position }, 150, () => {
							animateClass.value = "";
						});
						spanElement.classList.add("active");
					});
				} else {
					if (tab[props.code]) {
						emit("update:activeIndex", tab[props.code]);
					} else {
						emit("update:activeIndex", index);
					}
					emit("tabClick");
					animateLine(lineElement, { left: position, width: pos.value - position + wid.value }, 300, () => {
						animateLine(lineElement, { width }, 150, () => {
							animateClass.value = "";
						});
						spanElement.classList.add("active");
					});
				}
				pos.value = position;
				wid.value = width;
			}
		}
	}
};

const animateLine = (element: HTMLElement | null, properties: { [key: string]: number }, duration: number, callback?: () => void) => {
	if (!element) return;

	const start = performance.now();
	const initialWidth = parseFloat(getComputedStyle(element).width);
	const initialLeft = parseFloat(getComputedStyle(element).left);

	const animate = (time: number) => {
		const elapsed = time - start;
		const progress = Math.min(elapsed / duration, 1);

		for (const property in properties) {
			if (properties.hasOwnProperty(property)) {
				const initialValue = property === "width" ? initialWidth : initialLeft;
				const targetValue = properties[property];
				const currentValue = initialValue + (targetValue - initialValue) * progress;

				element.style.setProperty(property, `${currentValue}px`);
			}
		}

		if (progress < 1) {
			requestAnimationFrame(animate);
		} else {
			if (typeof callback === "function") {
				callback();
			}
		}
	};

	requestAnimationFrame(animate);
};
</script>

<style scope lang="scss">
.tabs {
	.line {
		position: absolute;
		height: 4px;
		border-radius: 12px;
		@include themeify {
			background: themed("Theme-P");
		}
	}

	nav {
		padding-bottom: 14px;
	}
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;

		li {
			flex: 1;
			padding: 10px;
			text-align: center;

			span {
				@include themeify {
					color: themed("T1");
				}
				font-size: 30px;
				font-style: normal;
				font-weight: 600;
				line-height: 40px;
				transition: all 0.4s ease;

				&.active {
					@include themeify {
						color: themed("Theme-P");
					}
					// opacity: 1;
				}
			}
		}
	}
}
</style>
