var core = {
	addScript: function(url, fn, charset) {
        var _self = this;
        var doc = document;
        var script = doc.createElement('script');
        script.language = 'javascript';
        script.charset = charset ? charset : 'utf-8';
        script.type = 'text/javascript';
        script.src = url;
        script.onload = script.onreadystatechange = function() {
            if (!script.readyState || 'loaded' === script.readyState || 'complete' === script.readyState) {
                fn && fn();
                script.onload = script.onreadystatechange = null;
                script.parentNode.removeChild(script);
            }
        };
        script.onerror = function(e){
        	console.error('Load Error'+url);
        };

        
        
        doc.head.appendChild(script);

        
    },
    evil:function(fn) {
    	var _self = this;
	    var Fn = Function;
	    return new Fn('return ' + fn)();
	}
}