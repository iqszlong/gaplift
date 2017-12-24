var work = {
	init:function(){
		htmlImport.setItem(config.importFile,'frame');
		app.nav();
		app.dropmenu();
		htmlImport.setItem(config.importFile,'work');
		mdc.autoInit(document,function(){});
	}
}