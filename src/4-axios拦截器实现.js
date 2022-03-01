// 构造函数
function Axios(config) {
	this.config = config;
	this.interceptors = {
		request: new InterceptorManager(),
		response: new InterceptorManager(),
	};
}

Axios.prototype.request = function (config) {
	// 创建一个promise
	let promise = Promise.resolve(config);
	// 创建一个数组
	const chains = [dispatchRequest, undefined];
	// 处理拦截器
	// 请求拦截器 将请求拦截器的回调压入到chains的前面
	this.interceptors.request.handlers.forEach((item) => {
		chains.unshift(item.fulfilled, item.rejected);
	});
	// 响应拦截器
	this.interceptors.response.handlers.forEach((item) => {
		chains.push(item.fulfilled, item.rejected);
	});

	// 遍历
	while (chains.length > 0) {
		promise = promise.then(chains.shift(), chains.shift());
	}
	return promise;
};

// 发送请求
function dispatchRequest(config) {
	//返回一个promise 队形
	return new Promise((resolve, reject) => {
		resolve({
			status: 200,
			statusText: 'OK',
		});
	});
}

//创建实例
let context = new Axios({});
//创建axios函数
let axios = Axios.prototype.request.bind(context);
Object.keys(context).forEach((key) => {
	axios[key] = context[key];
});

// 拦截器管理器的构造函数
function InterceptorManager() {
	this.handlers = [];
}

InterceptorManager.prototype.use = function (fulfilled, rejected) {
	this.handlers.push({
		fulfilled,
		rejected,
	});
};
