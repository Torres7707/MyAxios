// 构造函数
function Axios(config) {
	this.config = config;
}
Axios.prototype.request = function (config) {
	return dispatchRequest(config);
};
function dispatchRequest(config) {
	return xhrAdapter(config);
}
function xhrAdapter(config) {
	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.open(config.method, config.url);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve({
						status: xhr.status,
						statusText: xhr.statusText,
					});
				} else {
					reject(new Error('请求失败'));
				}
			}
		};

		// 取消请求
		if (config.CancelToken) {
			config.CancelToken.promise.then((value) => {
				xhr.abort();
			});
		}
	});
}

// CancelToken构造函数
function CancelToken(executor) {
	// 给canceltoken创建一个promise，然后把该promise的resolve暴露出来，通过在外部去调用这个resolve来改变promise的状态，从而进一步触发该promise的then方法，然后在then方法里调用xhr.abour()方法取消请求
	var resolvePromise;
	this.promise = new Promise(function (resolve, reject) {
		resolvePromise = resolve;
	});
	executor(function () {
		resolvePromise();
	});
}

const context = new Axios({});
const axios = Axios.prototype.request(context);
