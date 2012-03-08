Ext.Loader.setConfig({
	enabled : true,
	paths : {
		'Ext' : 'extjs/src'
	}
});

Ext.application({
	name : 'HelloExt',
	launch : function() {
		Ext.create('Ext.container.Viewport', {
			layout : 'fit',
			items : [{
				title : 'Hello Ext',
				html : 'Hello! Welcome to Ext JS.'
			}]
		});
	}
});