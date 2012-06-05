/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require([
	'Ext.Window',
	'Ext.layout.container.Fit',
	'Ext.fx.target.Sprite',
	'Ext.button.Button',
	'Ext.grid.property.Grid',
	'Ext.data.*',
	'Ext.form.*',
	'Ext.chart.*',
	'Ext.grid.Panel',
	'Ext.layout.container.Column'
]);

Ext.onReady(function () {
	var bd = Ext.getBody(),
		form = false,
		rec = false,
		selectedStoreItem = false,
		
		createListener = function() {
			store1.loadData(generateData());
		},
		
        createListeners = function() {
            return {
                // buffer so we don't refire while the user is still typing
                buffer: 200,
                change: function(field, newValue, oldValue, listener) {
                    // if (rec && form) {
                       if (newValue > field.maxValue) {
                          field.setValue(field.maxValue);
                       } else {
				        store1.loadData(generateData());
                       }
                }
            };
        };

	var myData = [['data']];
	var propData = myData[0];
		propData[1] = 10;
		propData[2] = 10;
		propData[3] = 10;
		propData[4] = 10;
		propData[5] = 10;
		
	var ds = Ext.create('Ext.data.ArrayStore', {
		fields: [
			{name: "회사명"},
			{name: "업종"},
			{name: "용수량", type: 'float'},
			{name: "폐수온도", type: 'float'},
			{name: "승온용수량", type: 'float'},
			{name: "에너지 원료"},
			{name: "에너지 단가", type: 'float'},
			{name: "지역 온도"},
			{name: "작성자"}
		],
		data: myData
	});
	var placeTemperature = [1, 1, 4, 11, 17, 21, 25, 26, 21, 14, 6, 1];
	var heatEnergy = [9200, 9500, 650000, 4600, 8700];
	var propsGrid = Ext.create('Ext.grid.property.Grid', {
		propertyNames: {
			tested: 'QA',
			borderWidth: 'Border Width'
		},
		source: {
			"회사명": "SNS",
			"업종": "Energy",
			"용수량": 3000,
			"폐수온도": 45,
			"승온용수량": 50,
			"에너지 원료": "중유",
			"에너지 단가": 42000,
			"지역 온도": "한국",
			"작성자": "홍길동"
		}
	});
	
    window.generateData = function(n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
        floor = (!floor && floor !== 0)? 20 : floor;
		
		var variance1 = 1.0/0.9;
		var variance2 = 0.8*0.6*propsGrid.getSource()["승온용수량"]/100/0.9;
		var temperatureVariance = 1.0;
		var days = 25.0;
        for (i = 0; i < (n || 12); i++) {
			if (placeTemperature[i] > 28) {
				temperatureVariance = 0.70;
			} else if(placeTemperature[i] > 26) {
				temperatureVariance = 0.75;
			} else if(placeTemperature[i] > 24) {
				temperatureVariance = 0.80;
			} else if(placeTemperature[i] > 22) {
				temperatureVariance = 0.85;
			} else if(placeTemperature[i] > 19) {
				temperatureVariance = 0.90;
			} else if(placeTemperature[i] > 16) {
				temperatureVariance = 0.95;
			} else {
				temperatureVariance = 1.0;
			}

			window.console.log(
					// 1000.0 * variance1 *
					// propsGrid.getSource()["용수량"]
					// (propsGrid.getSource()["폐수온도"]-placeTemperature[i]*temperatureVariance)/
					// heatEnergy[2]*
					// propsGrid.getSource()["에너지 단가"]*
					// days
					);
			month1 =	1000.0 * variance1 *
						propsGrid.getSource()["용수량"]*
						(propsGrid.getSource()["폐수온도"]-placeTemperature[i]*temperatureVariance)/
						heatEnergy[2]*
						propsGrid.getSource()["에너지 단가"]*
						days;
			month2 = 	1000.0 * variance2 *
						propsGrid.getSource()["용수량"]*
						(propsGrid.getSource()["폐수온도"]-placeTemperature[i])/
						heatEnergy[2]*
						propsGrid.getSource()["에너지 단가"]*
						days;
            data.push({
                name: Ext.Date.getShortMonthName([i % 12]),
                data1: month1,	
                data2: month1-month2
            });
        }
        return data;
    };
	
    window.generatePieData = function(n, floor){
		var data = [],
            i;
			
			
		var total1 = 0;
		var total2 = 0;
		store1.each(function(rec) {
			total1 += rec.get('data1');
			total2 += rec.get('data2');
		});
		
		data.push({
            name: '절감',
            data1: (1-total2/total1)*100
        });
   		data.push({
           name: '적용후',
           data1: (total2/total1)*100
       	});
        return data;
    };

    window.store1 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2'],
        data: generateData()
    });
	window.store2 = Ext.create('Ext.data.JsonStore', {
		fields: ['name', 'data1'],
		data: generatePieData()
	});

	var updateButton = Ext.create('Ext.button.Button', {
		// renderTo: 'button-container',
		text: '초기화',
		// width: 300,
		handler: function() {
			propsGrid.setSource({
				"회사명": "SNS",
				"업종": "Energy",
				"용수량": 3000,
				"폐수온도": 45,
				"승온용수량": 50,
				"에너지 원료": "중유",
				"에너지 단가": 42000,
				"지역 온도": "한국",
				"작성자": "홍길동"
			});
	        store1.loadData(generateData());
		}
	});
	
	var applyButton = Ext.create('Ext.button.Button', {
		text: '적용',
		handler: function() {
			store1.loadData(generateData());
			store2.loadData(generatePieData());
		}
	})
	
	var pieChart = Ext.create('Ext.form.Panel', {
		width: 270,
		height: 270,
		title: 'Saving Percentage',
		layout: 'fit',
		items: {
			xtype: 'chart',
			id: 'chartCmp',
			animate: true,
			store: store2,
			shadow: true,
			legend: {
				position: 'right'
			},
			// insetPadding: 60,
			theme: 'Base:gradients',
			series: [{
				type: 'pie',
				field: 'data1',
				showInLegend: true,
				tips: {
					trackMouse: true,
					width: 140,
					height: 28,
					renderer: function(storeItem, item) {
						//calculate percentage,
						var total = 0;
						store2.each(function(rec) {
							total += rec.get('data1');
						});
						this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
					}
				},
				highlight: {
					segment: {
						margin: 20
					}
				},
				label: {
					field: 'name',
					display: 'rotate',
					contrast: true,
					font: '18px Arial'
				}
			}]
		}
	})
	
    var win = Ext.create('Ext.form.Panel', {
		// x:350,
		// y:100,
		id: 'company-form',
		width: 700,
        height: 600,
        // minHeight: 400,
        // minWidth: 550,
        hidden: false,
        maximizable: true,
        title: 'Column Chart',
        // renderTo: Ext.getBody(),
        layout: 'fit',
        // tbar: [{
        //             text: 'Reload Data',
        //             handler: function() {
        //                 store1.loadData(generateData());
        //             }
        //         }],
        items: {
            id: 'chartCmp',
            xtype: 'chart',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: store1,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'column',
                axis: 'left',
				style: {fill:"#C0C0C0"},
                highlight: true,
				color: 0xFF0000,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' ₩');
                  }
                },
                label: {
                  display: 'insideEnd',
                  'text-anchor': 'middle',
                    field: 'data1',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'vertical',
                    color: '#333'
                },
                xField: 'name',
                yField: 'data1'
            },
			{
                type: 'column',
                axis: 'left',
				// style: {fill:"#CED9E7"},
				style: {fill:'#83ACDB'},
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data2') + ' ₩');
                  }
                },
                label: {
                  display: 'insideEnd',
                  'text-anchor': 'middle',
                    field: 'data2',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'vertical',
                    color: '#333'
                },
                xField: 'name',
                yField: 'data2'
            }]
        }
    });

	var Form = Ext.create('Ext.form.Panel', {
		title: '페수열회수 절감 금액 산출',
		frame: true,
		bodyPadding: 5,
		width: 1000,
		height: 720,
		
		fieldDefaults: {
			labelAlign: 'left',
			msgTarget: 'slide'
		},
		
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		
		items: [
		{
			width: 700,
			layout : 'fit',
			margin: '0 0 0 0',
			items: [win]
		},
		{
			layout: {type: 'vbox', align: 'stretch'},
			flex: 3,
			border: false,
			bodyStyle: 'background-color: transparent',
			items: [ {
				flex:0.4,
				layout: {
					type: 'vbox',
					align:'stretch'
				},
				margin: '0 0 0 5',
				title: 'Property',
				items: [updateButton, propsGrid, applyButton, pieChart]
			}]
		}],
		renderTo: bd
	});
	
	window.console.log(propsGrid.getHeight());
	// selectionchange(myData);
});

