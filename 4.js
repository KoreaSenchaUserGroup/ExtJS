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
			width: 200,
			height: 100,
			floating: true, // make this panel an absolutely-positioned floating component
			draggable: true,
			title: 'Test',
			html: 'Test Panel'
		});
		
    Ext.create('Ext.button.Button', {
        renderTo: Ext.getBody(),
        margin: 10,
        text: 'Show Panel',
        handler: function() {
            panel.show(); // show the panel
        }
    });

    Ext.create('Ext.button.Button', {
        renderTo: Ext.getBody(),
        margin: 10,
        text: 'Hide Panel',
        handler: function() {
            panel.hide(); // hide the panel
        }
    });

    Ext.create('Ext.button.Button', {
        renderTo: Ext.getBody(),
        margin: 10,
        text: 'Align Panel to this button',
        handler: function() {
            // align the top left corner of the panel to the bottom right corner
            // of this button, offset by 3 pixels in each direction
            panel.alignTo(this.getEl(), 'tl-br', [3, 3]);
        }
    });

    Ext.create('Ext.button.Button', {
        renderTo: Ext.getBody(),
        margin: 10,
        text: 'Center Panel',
        handler: function() {
            panel.center(); // center the panel
        }
    });
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