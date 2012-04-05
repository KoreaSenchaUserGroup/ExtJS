Ext.Loader.setConfig({
	enabled : true,
	paths : {
		'Ext' : 'extjs/src',
		'Ksug':'ksug'
	}
});

Ext.require('Ext.container.Viewport');
Ext.require('Ext.window.MessageBox');				//ext-dev 를 쓰기때문에 동적으로 가져옴
Ext.require('Ext.tab.Panel');
Ext.require('Ksug.sample.model.Sample');
Ext.application({
	name : 'Ksug',
	appFolder: 'ksug',
	launch : function() {
		var sample = Ext.create('Ksug.sample.model.Sample', {
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

		Ext.create('Ext.tab.Panel', {
			renderTo: Ext.getBody(),
			height: 100,
			width: 200,
			items: [{
				//Explicitly define the xtype of this Component configuration.
				//This tells the Container (the tab panel in this case)
				//to instantiate a Ext.panel.Panel when it deems necessary
				title: 'Tab one',
				html: 'The first tab',
				listeners: {
					render: function() {
						Ext.MessageBox.alert('Render One', 'Tab One was rendered');
					}
				}
			},
			{
				title: 'Tab two',
				html: 'The second tab',
				listeners: {
					render: function() {
						Ext.MessageBox.alert('Rendered One', 'Tab Two was rendered');
					}
				}
			}]
		})		
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