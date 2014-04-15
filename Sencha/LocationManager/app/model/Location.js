Ext.define('LocationManager.model.Location', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                allowNull: false,
                name: 'id',
                type: 'int'
            },
            {
                allowNull: false,
                name: 'name',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                allowNull: false,
                name: 'latitude',
                type: 'float'
            },
            {
                allowNull: false,
                name: 'longitude',
                type: 'float'
            }
        ]
    }
});