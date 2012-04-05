Ext.Loader.setConfig({
	enabled : true,
	paths : {
		'Ext' : 'extjs/src',
		'Ksug':'ksug'
	}
});

Ext.define('Ext.ux.Image', {
    extend: 'Ext.Component', // subclass Ext.Component
    alias: 'widget.managedimage', // this component will have an xtype of 'managedimage'
    autoEl: {
        tag: 'img',
        src: Ext.BLANK_IMAGE_URL,
        cls: 'my-managed-image'
    },
 
    // Add custom processing to the onRender phase.
    // Add a ¡®load¡¯ listener to the element.
    onRender: function() {
        this.autoEl = Ext.apply({}, this.initialConfig, this.autoEl);
        this.callParent(arguments);
        this.el.on('load', this.onLoad, this);	// works like addlistener
    },
 
    onLoad: function() {
        this.fireEvent('load', this);
    },
 
    setSrc: function(src) {
        if (this.rendered) {
            this.el.dom.src = src;
        } else {
            this.src = src;
        }
    },

    getSrc: function(src) {
        return this.el.dom.src || this.src;
    }
});

Ext.require('Ext.container.Viewport');
Ext.require('Ksug.sample.model.Sample') ;
Ext.application({
	name : 'Ksug',
	appFolder: 'ksug',
	launch : function() {
    var image = Ext.create('Ext.ux.Image');

    Ext.create('Ext.panel.Panel', {
        title: 'Image Panel',
        height: 200,
        renderTo: Ext.getBody(),
        items: [ image ]
    })

    image.on('load', function() {
        console.log('image loaded: ', image.getSrc());
    });

    image.setSrc('http://www.sencha.com/img/sencha-large.png');
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