export default {
	name: "နာမည",
	tel: "ဖုန်း",
	save: "သိမ်းမည်",
	clear: "ရှင်းလင်းမည်",
	cancel: "ပယ်ဖျက်မည်",
	confirm: "သတိပေးမည်",
	delete: "ဖျက်မည်",
	loading: "တင်နေသည်...",
	noCoupon: "လူသာယာမရှိပါ",
	nameEmpty: "နာမညကိုဖြည့်ရင်းပါ",
	addContact: "ဆက်သွယ်သည့်အသုံးပြုသူထည့်မည်",
	telInvalid: "ဖုန်းနံပါတ်ကိုမှန်ကန်ပါ",
	vanCalendar: {
		end: "အဆုံးသတ်မှတ်",
		start: "အစတြိုး",
		title: "ရက်စွဲရွေးချယ်ရန်",
		weekdays: ["န", "လ", "စ", "င", "သ", "သု", "စနေ"],
		monthTitle: (year: number, month: number) => `${year} ခုနှစ် ${month} လပြည့်`,
		rangePrompt: (maxRange: number) => `အများဆုံး ${maxRange} ရက်ကို ရွေးမည်`,
	},
	vanCascader: {
		select: "ရွေးမည်",
	},
	vanPagination: {
		prev: "နောက်သို့",
		next: "နှုန်းသို့",
	},
	vanPullRefresh: {
		pulling: "အောက်တိုးရန်အောက်ပြန်မည်...",
		loosing: "အောက်တိုးထွက်မည်...",
	},
	vanSubmitBar: {
		label: "စုစုပေါင်း:",
	},
	vanCoupon: {
		unlimited: "အများဆုံး",
		discount: (discount: number) => `${discount} ရှေ့`,
		condition: (condition: number) => `${condition} ကျပ်မည်ရန် အသံလိုအပ်သည်`,
	},
	vanCouponCell: {
		title: "လူသာယာ",
		count: (count: number) => `${count} ခုမှာရရှိနိုင်သည်`,
	},
	vanCouponList: {
		exchange: "အကြောင်းအရာ",
		close: "မသုံးမီ",
		enable: "အသံအုတ်",
		disabled: "မအသံအုတ်",
		placeholder: "လူသာယာနံပါတ်ထည့်ရမည်",
	},
	vanAddressEdit: {
		area: "ရွေးချယ်မည်",
		areaEmpty: "ရွေးချယ်ရန် သုံးမည်",
		addressEmpty: "အပြည့်အစုံကိုဖြည့်သည်",
		addressDetail: "အပြည့်အစုံအသေး",
		defaultAddress: "ပုံမှန်တာအဖြစ်သတ်မှတ်မည်",
	},
	vanAddressList: {
		add: "လူသာယာ ထည့်မည်",
	},
};
