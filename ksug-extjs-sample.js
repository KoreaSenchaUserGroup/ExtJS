Ext.Loader.setConfig({
	enabled : true,
	paths : {
		'Ext' : 'extjs/src',
		'Ksug':'ksug'
	}
});

Ext.require('Ext.container.Viewport');
Ext.require('Ksug.sample.model.Sample') ;
Ext.application({
	name : 'Ksug',
	appFolder: 'ksug',
	launch : function() {
		var sample = Ext.create('Ksug.sample.model.Sample', {
			name : 'test'
		});

		Ext.create('Ext.container.Viewport', {
			layout : 'fit',
			items : [{
				title : 'Hello '+sample.get('name'),
				html : 'Hello! Welcome to Ext JS.'
			}]
		});
	}
});