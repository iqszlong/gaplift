var loader = {
	beforeJs:function(jslist){
		var importJs = jslist;
		if(typeof(importJs) != 'undefined' && importJs != '' && importJs.length > 0){
			for (var i = 0; i < importJs.length; i++) {
				core.addScript(importJs[i]);
			}
		}
	},
	init:function(){
		this.beforeJs(config.importJs);
		htmlImport.getFile(config.importFile);
		
	}
}
loader.init();