import { createVNode, render } from "vue";
import Modal from "./tipsModel.vue"; // 导入模态框组件路径

interface ModalOptions {
	title?: string; // 模态框标题
	text: string; // 模态框内容文本
	showCancel?: boolean; // 控制取消按钮的显示，默认显示
	showConfirm?: boolean; // 控制确认按钮的显示，默认显示
	cancelText?: string;
	confirmText?: string;
	onConfirm?: () => void; // 确认按钮的回调函数
	onClose?: () => void; // 关闭模态框的回调函数
}

// 封装公共模态框逻辑的 hooks
export function useModal(options: ModalOptions) {
	const container = document.createElement("div"); // 创建容器元素
	document.body.appendChild(container); // 将容器添加到 body 中

	// 关闭模态框并清理 DOM
	const closeModal = () => {
		render(null, container); // 清空渲染的模态框
		document.body.removeChild(container); // 移除容器
	};

	// 创建模态框的虚拟节点
	const vnode = createVNode(Modal, {
		title: options.title, // 设置模态框标题
		text: options.text, // 设置模态框内容
		cancelText: options.cancelText, // 添加取消按钮文本
		confirmText: options.confirmText, // 添加确认按钮文本
		showCancel: options.showCancel !== undefined ? options.showCancel : true, // 取消按钮的显示状态
		showConfirm: options.showConfirm !== undefined ? options.showConfirm : true, // 确认按钮的显示状态
		onClose: () => {
			options.onClose && options.onClose(); // 调用关闭回调
			closeModal(); // 关闭模态框
		},
		onConfirm: () => {
			options.onConfirm && options.onConfirm(); // 调用确认回调
			closeModal(); // 关闭模态框
		},
	});

	// 渲染模态框到容器中
	render(vnode, container);

	// 处理遮罩点击事件以关闭模态框
	const maskClickHandler = (event: MouseEvent) => {
		if (event.target === container) {
			// 检查点击的是否为遮罩
			closeModal(); // 关闭模态框
		}
	};

	container.addEventListener("click", maskClickHandler); // 监听遮罩点击事件

	// 清理函数，确保移除事件监听
	const cleanup = () => {
		container.removeEventListener("click", maskClickHandler); // 移除监听
		closeModal(); // 清理模态框
	};

	// 返回清理函数，以便在需要时调用
	return cleanup;
}
