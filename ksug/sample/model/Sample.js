Ext.define('Ksug.sample.model.Sample',{
	extend: 'Ext.data.Model',
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'age',   type: 'int'},
        {name: 'phone', type: 'string'},
        {name: 'alive', type: 'boolean', defaultValue: true}
    ],

    changeName: function() {
        var oldName = this.get('name'),
            newName = oldName + " The Barbarian";

        this.set('name', newName);
    }
});