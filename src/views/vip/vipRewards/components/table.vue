<template>
	<div class="table-container">
		<table class="styled-table">
			<thead>
				<tr>
					<th></th>
					<th>青铜</th>
					<th>白银</th>
					<th>黄金</th>
					<th>白金I</th>
					<th>白金II</th>
					<th>钻石I</th>
					<th>钻石II</th>
					<th>钻石III</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>升级奖金</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
				<tr>
					<td>幸运转盘</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
				<tr>
					<td>每周流水礼金</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
				<tr>
					<td>每月流水礼金</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
				<tr>
					<td>周体育流水礼金</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
				<tr>
					<td>免费提款</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
				<tr>
					<td>豪华赠品</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
				<tr>
					<td>VIP定制客服</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped lang="scss">
/* 表格容器样式 */
.table-container {
	overflow-x: auto; /* 启用横向滚动条 */
	width: 100%; /* 确保容器宽度为100% */
}

/* 表格整体样式 */
.styled-table {
	min-width: 1787px;
	border-collapse: collapse;
	width: 100%;
	border-radius: 20px; /* 圆角属性 */
	border-collapse: separate; /* 使用 separate 确保圆角效果 */
	border-spacing: 0; /* 设置为0来减少间距 */
	overflow: hidden; /* 确保圆角生效 */
	border: 1px solid;
	box-sizing: border-box;
	@include themeify {
		border-color: themed("Line");
	}
}

/* 表头样式 */
.styled-table thead {
	@include themeify {
		background-color: themed("BG1");
	}
}

.styled-table thead th {
	height: 86px;
	padding: 18px 24px; /* 单元格内边距 */
	text-align: center; /* 标题居中 */
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 500;
	border-bottom: 1px solid;
	border-left: 1px solid;
	@include themeify {
		color: themed("TB");
		border-color: themed("Line");
	}
	box-sizing: border-box;

	&:first-child {
		border-left: none;
	}
}

/* 表格主体行样式 */
.styled-table tbody tr {
	height: 76px;
	@include themeify {
		background-color: themed("BG3");
	}
}

/* 第一列样式 */
.styled-table tbody td:first-child {
	width: 259px;
	text-align: left;
	padding: 18px 24px; /* 单元格内边距 */
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 500;
	border-bottom: 1px solid;
	border-left: none;
	@include themeify {
		color: themed("TB");
		border-color: themed("Line");
	}
}

/* 其余列样式 */
.styled-table td:not(:first-child) {
	width: 191px;
	text-align: center;
	padding: 18px 24px; /* 单元格内边距 */
	border-bottom: 1px solid;
	border-left: 1px solid;
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 500;
	@include themeify {
		color: themed("T3");
		background-color: themed("BG3");
		border-color: themed("Line");
	}
}

/* 确保表头和表格主体的圆角效果一致 */
.styled-table thead th:first-child {
	border-top-left-radius: 20px; /* 左上角圆角 */
}

.styled-table thead th:last-child {
	border-top-right-radius: 20px; /* 右上角圆角 */
}
</style>
