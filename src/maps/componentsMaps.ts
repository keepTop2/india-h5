//公共组件字典
import dayjs from "dayjs";
import { TimeShortcutOptionsEnum } from "/@/enum/componentsEnum";
import { TimeShortcutOptionsModel } from "/@/models/componentsModels";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(tz);
/**
 * @description 日期范围选择器  时间快捷选项字典
 */
export const timeShortcutOptionsMap = new Map<TimeShortcutOptionsEnum, TimeShortcutOptionsModel>([
	[
		TimeShortcutOptionsEnum.d1,
		{
			code: TimeShortcutOptionsEnum.d1,
			startTime: (): number => dayjs().startOf("day").valueOf(),
			endTime: (): number => dayjs().endOf("day").valueOf(),
		},
	],
	[
		TimeShortcutOptionsEnum.d2,
		{
			code: TimeShortcutOptionsEnum.d2,
			startTime: (): number => dayjs().subtract(1, "day").startOf("day").valueOf(),
			endTime: (): number => dayjs().subtract(1, "day").endOf("day").valueOf(),
		},
	],
	[
		TimeShortcutOptionsEnum.d3,
		{
			code: TimeShortcutOptionsEnum.d3,
			startTime: (): number => dayjs().subtract(7, "day").valueOf(),
			endTime: (): number => dayjs().valueOf(),
		},
	],
	[
		TimeShortcutOptionsEnum.d4,
		{
			code: TimeShortcutOptionsEnum.d4,
			startTime: (): number => dayjs().subtract(30, "day").valueOf(),
			endTime: (): number => dayjs().valueOf(),
		},
	],
]);
