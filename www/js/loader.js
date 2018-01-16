var loader = {
	beforeJs:function(jslist){
		var importJs = jslist;
		if(typeof(importJs) != 'undefined' && importJs != '' && importJs.length > 0){
			for (var i = 0; i < importJs.length; i++) {
				core.addScript(importJs[i]);
			}
		}
	},
	changePath:function(array){
		var dirpath = 'http://192.168.8.16/eapp/';
		for (var i = 0; i < array.length; i++) {
			if(typeof array[i] !== 'string'){
				array[i].path = dirpath + array[i].path;
			}else{
				array[i] = dirpath + array[i];
			}
		}

	},
	init:function(){
		this.changePath(config.importJs);
		this.changePath(config.importFile);
		this.beforeJs(config.importJs);
		
		// console.log(config.importFile);
		htmlImport.getFile(config.importFile);
		
	}
}
loader.init();