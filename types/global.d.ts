// import type { ComponentRenderProxy, VNode, VNodeChild, PropType as VuePropType } from 'vue';

import type { ComponentRenderProxy, VNode, VNodeChild } from "vue";

declare global {
	const __APP_INFO__: {
		pkg: {
			name: string;
			version: string;
			dependencies: Recordable<string>;
			devDependencies: Recordable<string>;
		};
		lastBuildTime: string;
	};

	// 注释标签vant props必传
	// declare type PropType<T> = VuePropType<T>;
	declare type VueNode = VNodeChild | JSX.Element;

	export type Writable<T> = {
		-readonly [P in keyof T]: T[P];
	};

	declare type Nullable<T> = T | null;
	declare type NonNullable<T> = T extends null | undefined ? never : T;
	declare type Recordable<T = any> = Record<string, T>;
	declare type ReadonlyRecordable<T = any> = {
		readonly [key: string]: T;
	};
	declare type Indexable<T = any> = {
		[key: string]: T;
	};
	declare type DeepPartial<T> = {
		[P in keyof T]?: DeepPartial<T[P]>;
	};
	declare type TimeoutHandle = ReturnType<typeof setTimeout>;
	declare type IntervalHandle = ReturnType<typeof setInterval>;

	declare interface ChangeEvent extends Event {
		target: HTMLInputElement;
	}

	declare interface WheelEvent {
		path?: EventTarget[];
	}
	interface ImportMetaEnv extends ViteEnv {
		__: unknown;
	}

	declare interface ViteEnv {
		VITE_USE_ERUDA: Boolean;
		VITE_USE_COMPRESS: Boolean;
		VITE_USE_REPORT: Boolean;
	}

	declare function parseInt(s: string | number, radix?: number): number;

	declare function parseFloat(string: string | number): number;

	namespace JSX {
		// tslint:disable no-empty-interface
		type Element = VNode;
		// tslint:disable no-empty-interface
		type ElementClass = ComponentRenderProxy;
		interface ElementAttributesProperty {
			$props: any;
		}
		interface IntrinsicElements {
			[elem: string]: any;
		}
		interface IntrinsicAttributes {
			[elem: string]: any;
		}
	}

	declare interface Window {
		eventCenterForSportA: EventCenterForMicroApp;
		__MICRO_APP_ENVIRONMENT__: boolean;
		__MICRO_APP_PUBLIC_PATH__: string;
		SVG_CONFIG: Record<string, string>;
	}
}
