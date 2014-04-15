Ext.define('LocationManager.view.MainView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainview',

    requires: [
        'Ext.Panel',
        'Ext.Map',
        'Ext.navigation.Bar',
        'Ext.Button'
    ],

    config: {
        items: [
            {
                xtype: 'panel',
                title: 'Locations',
                itemId: 'mapPanel',
                items: [
                    {
                        xtype: 'map',
                        height: '100%',
                        itemId: 'map'
                    }
                ]
            }
        ],
        navigationBar: {
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'listLocationsButton',
                    iconCls: 'more'
                },
                {
                    xtype: 'button',
                    align: 'right',
                    itemId: 'addLocationButton',
                    iconCls: 'add'
                }
            ]
        }
    }

});