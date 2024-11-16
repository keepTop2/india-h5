import { reactive } from "vue";

type PromiseFn<S> = (submitData: S) => Promise<any>;

// 这个 hook 要注意，不能涉及单个彩种的业务。都是所有彩种通用的逻辑才能放在这里
// T 就是 TableDataItem 类型，S 就是入参的类型
export function useInfiniteScroll<T, S>(promiseFn: PromiseFn<S>, getSubmitData = Function.prototype) {
	const tableData = ref<T[]>([]);
	const loading = ref(false);
	const finished = ref(false);
	const pagination = reactive({ page: 1, size: 10, total: 0 });

	const setLoading = (status: boolean) => (loading.value = status);
	const setFinished = (status: boolean) => (finished.value = status);

	function issueHistory() {
		// 发送请求。这里 finally 要做事情，因此没用 async await
		setLoading(true);
		const submitData = getSubmitData();
		promiseFn(submitData)
			.then((res) => {
				const { records = [], total = 0 } = res.data || {};
				tableData.value = [...tableData.value, ...records];
				pagination.total = total;
				pagination.page += 1;

				if (tableData.value.length >= pagination.total) {
					setFinished(true);
				}
			})
			.catch((error) => console.log("error", error))
			.finally(() => setLoading(false));
	}

	return { tableData, pagination, loading, finished, issueHistory };
}
