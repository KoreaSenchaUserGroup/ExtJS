Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'extjs/ux/');
Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.form.*',
    'Ext.ux.data.PagingMemoryProxy',
    'Ext.grid.Panel'
]);

Ext.onReady(function() {

    MultiLangDemo = (function() {
        return {
            init: function() {
				var store = Ext.create('Ext.data.ArrayStore', {
				    fields: ['code', 'language'],
				    data  : Ext.local.languages //from languages.js
				});
				
				var combo = Ext.create('Ext.form.field.ComboBox', {
				    renderTo: 'languages',
				    store: store,
				    displayField: 'language',
				    queryMode: 'local',
				    emptyText: 'Select a language...',
				    hideLabel: true,
				    listeners: {
				        select: {
				            fn: function(cb, records) {
				                var record = records[0];
				                window.location.search = Ext.urlEncode({"lang":record.get("code")});
				            },
				            scope: this
				        }
				    }
				});
				
				var params = Ext.urlDecode(window.location.search.substring(1));

				if (params.lang) {
				    var url = Ext.util.Format.format('extjs/locale/ext-lang-{0}.js', params.lang);
				
				    Ext.Ajax.request({
				        url: url,
				        success: this.onSuccess,
				        failure: this.onFailure,
				        scope: this
				    });
				
				    // check if there's really a language with passed code
				    var record = store.findRecord('code', params.lang, null, null, null, true);
				    // if language was found in store, assign it as current value in combobox
				
				    if (record) {
				        combo.setValue(record.data.language);
				    }
				} else {
				    // no language found, default to english
				    this.setup();
				}
				
				Ext.tip.QuickTipManager.init();
            },
			onSuccess: function(response) {
			    eval(response.responseText);
			    this.setup();
			},
			onFailure: function() {
			    Ext.Msg.alert('Failure', 'Failed to load locale file.');
			    this.setup();
			},
			setup: function() {
			    Ext.create('Ext.FormPanel', {
			        renderTo: 'datefield',
			        frame: true,
			        title: 'Date picker',
			        width: 380,
			        defaultType: 'datefield',
			        items: [{
			            fieldLabel: 'Date',
			            name: 'date'
			        }]
			    });
			    
			    Ext.create('Ext.FormPanel', {
				    renderTo: 'emailfield',
				    labelWidth: 100,
				    frame: true,
				    title: 'E-mail Field',
				    width: 380,
				    defaults: {
				        msgTarget: 'side',
				        width: 340
				    },
				    defaultType: 'textfield',
				    items: [{
				        fieldlabel: 'Email',
				        name: 'email',
				        vtype: 'email'
				    }]
				});
				
				var monthArray = Ext.Array.map(Ext.Date.monthNames, function (e) { return [e]; });
				var ds = Ext.create('Ext.data.Store', {
				     fields: ['month'],
				     remoteSort: true,
				     pageSize: 6,
				     proxy: {
				         type: 'pagingmemory',
				         data: monthArray,
				         reader: {
				             type: 'array'
				         }
				     }
				 });
				
				Ext.create('Ext.grid.Panel', {
				    renderTo: 'grid',
				    width: 380,
				    height: 203,
				    title:'Month Browser',
				    columns:[{
				        text: 'Month of the year',
				        dataIndex: 'month',
				        width: 240
				    }],
				    store: ds,
				    bbar: Ext.create('Ext.toolbar.Paging', {
				        pageSize: 6,
				        store: ds,
				        displayInfo: true
				    })
				});
				// trigger the data store load
				ds.load();
			}
        };
    })();

    MultiLangDemo.init();
});