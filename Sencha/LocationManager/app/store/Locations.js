Ext.define('LocationManager.store.Locations', {
    extend: 'Ext.data.Store',

    requires: [
        'LocationManager.model.Location'
    ],

    config: {
        model: 'LocationManager.model.Location',
        storeId: 'Locations'
    }
});