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
		var panel = Ext.create('Ext.panel.Panel', {
			renderTo: Ext.getBody(),
			title: 'Test',
			html: 'Test Panel',
			hideMode: 'visibility'	// use css visibility to show and hide this component
		});
		
		panel.hide();	// hide the component
		panel.show(); // show the component
/*		var sample = Ext.create('Ksug.sample.model.Sample', {
			name : 'test'
		});

		var childPanel1 = Ext.create('Ext.panel.Panel', {
		    title: 'Child Panel 1',
		    html: 'A Panel'
		});
		
		var childPanel2 = Ext.create('Ext.panel.Panel', {
		    title: 'Child Panel 2',
		    html: 'Another Panel'
		});
		
		Ext.create('Ext.container.Viewport', {
		    items: [ childPanel1, childPanel2 ]
		});
	*/	
/*
		Ext.create('Ext.container.Viewport', {
			layout : 'fit',
			items : [{
				title : 'Hello '+sample.get('name'),
				html : 'Hello! Welcome to Ext JS.'
			}]
		});
*/
	}
});