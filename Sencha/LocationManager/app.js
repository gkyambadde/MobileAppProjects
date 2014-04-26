Ext.Loader.setConfig({

});


Ext.application({

    requires: [
        'Ext.MessageBox'
    ],
    models: [
        'Location'
    ],
    stores: [
        'Locations'
    ],
    views: [
        'MainView',
        'ListPanel',
        'FormPanel'
    ],
    controllers: [
        'Locations'
    ],
    name: 'LocationManager',

    launch: function() {

        Ext.create('LocationManager.view.MainView', {fullscreen: true});
    }

});
