// import VirtualScrollVirtualList from "./virtualScrollVirtualList/virtualScrollVirtualList.vue";
import { defineAsyncComponent } from "vue";
const VirtualScrollVirtualList = defineAsyncComponent(() => import("/@/views/venueHome/sports/components/virtualScrollVirtualList/virtualScrollVirtualList.vue"));
export { VirtualScrollVirtualList };
