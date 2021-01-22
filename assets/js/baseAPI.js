$.ajaxPrefilter(function (options) {
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

	// 统一为有权限的接口 设置headers请求头
	if (options.url.indexOf('/my/') !== -1) {
		options.headers = {
			Authorization: localStorage.getItem('token') || '',
		};
	}

	// 不论成功还是失败，最终都会调用complete回调函数
	// 全局统一挂载complete 回调函数
	options.complete = function (res) {
		// console.log('执行了 complete回调');
		// console.log(res);
		if (
			res.responseJSON.status === 1 &&
			res.responseJSON.message === '身份认证失败！'
		) {
			// 1.强制清空 token
			localStorage.removeItem('token');
			// 2.强制跳转到登录页面
			location.href = 'login.html';
		}
	};
});
