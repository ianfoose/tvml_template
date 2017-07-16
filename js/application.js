var resourceLoader;

App.onLaunch = function(options) {
	var javascriptFiles = [
		`${options.BASEURL}js/ResourceLoader.js`,
		`${options.BASEURL}js/Presenter.js`
	];

	evaluateScripts(javascriptFiles, function(success) {
		if(success) {
			resourceLoader = new ResourceLoader(options.BASEURL);
			
			// load resources
			// EXAMPLE: resourceLoader.loadResource(`${options.BASEURL}templates/template_name.xml.js`,
			
			function(resource) {
				var doc = Presenter.makeDocument(resource);
				
				// event listeners
				// EXAMPLE: doc.addEventListener("select", Presenter.load.bind(Presenter));
				
				Presenter.pushDocument(doc);
			});
		} else {
			var errorDoc = createAlert("Evaluate Scripts Error","Error attempting to evaluate external JavaScript files.");
			navigationDocument.presentModal(errorDoc);
		}
	});
}

App.onWillResignActive = function() {

}

App.onDidEnterBackground = function() {

}

App.onWillEnterForeground = function() {
    
}

App.onDidBecomeActive = function() {
    
}

App.onWillTerminate = function() {
    
}

var createAlert = function(title, description) {
	var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
		<document>
			<alertTemplate>
				<title>${title}</title>
				<description>${description}</description>
				<button>
					<text>OK</text>
				</button>
			</alertTemplate>
		</document>`
		var parser = new DOMParser();
		var alertDoc = parser.parseFromString(alertString, "application/xml");
		return alertDoc
}