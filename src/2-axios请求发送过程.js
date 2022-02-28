// 1.声明函数
function Axios(config) {
	this.config = config;
}

Axios.prototype.request = function (config) {
	// 	发送请求
	// 创建一个promise函数
	let promise = Promise.resolve(config);
	// console.log(promise);
	// 声明数组
	let chains = [dispatchRequest, undefined]; // undefined占位
	// 调用then方法指定回调
	let result = promise.then(chains[0], chains[1]);
	return result;
};

// 2.dispatchRequest函数
function dispatchRequest(config) {
	// 调用适配器发送请求
	return xhrAdapter(config).then(
		(response) => {
			// 对响应的结果进行处理
		},
		(err) => {
			console.log(err);
		}
	);
}

// 3.adapter适配器
function xhrAdapter(config) {
	return new Promise((resolve, reject) => {
		// 发送AJAX
		let xhr = new XMLHttpRequest();
		xhr.open(config.method, config.url);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve({
						config: config,
						data: xhr.response,
						headers: xhr.getAllResponseHeaders(),
						request: xhr,
						status: xhr.status,
						statusText: xhr.statusText,
					});
				} else {
					reject('失败，状态码为:' + xhr.status);
				}
			}
		};
	});
}
