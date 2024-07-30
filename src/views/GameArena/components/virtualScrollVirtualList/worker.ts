import { ref, watch, computed } from "vue";

const worker: Worker = self as any;

worker.onmessage = (e) => {
	const obj = JSON.parse(e.data);
	// getAarr();
	switch (obj.type) {
		case "infoPage":
			// infoPage();
			break;
		default:
			break;
	}
};
