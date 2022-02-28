// 构造函数Axios
function Axios(config) {
	//  初始化
	this.defaults = config; // 为了创建default默认属性
	this.interceptors = {
		request: {},
		response: {},
	};
}

// 原型需要添加方法
Axios.prototype.request = function request(config) {
	console.log('request,类型为：' + config.method);
};
Axios.prototype.get = function request(config) {
	console.log('get');
	return this.request({ method: 'GET' });
};
Axios.prototype.post = function request(config) {
	console.log('post');
	return this.request({ method: 'POST' });
};

// 声明函数
function createInstance(config) {
	// 实例化一个对象
	let context = new Axios(config);
	console.dir(context);
	// 创建请求函数
	let instance = Axios.prototype.request.bind(context);
	console.dir(instance);
	// 将Axios.prototype对象重点方法添加到instance函数对象中
	Object.keys(Axios.prototype).forEach((item) => {
		instance[item] = Axios.prototype[item].bind(context);
	});
	// 为instance函数对象添加属性default与interceptors
	Object.keys(context).forEach((item) => {
		instance[item] = context[item];
	});
	return instance;
}

let axios = createInstance();
