Ext.define('LocationManager.view.ListPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.listpanel',

    requires: [
        'Ext.Label',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        id: 'listPanel',
        items: [
            {
                xtype: 'label',
                centered: false,
                html: 'Swipe to remove a location.',
                padding: 10,
                style: 'color: #999; text-align: center;'
            },
            {
                xtype: 'list',
                height: '100%',
                itemTpl: [
                    '<div>',
                    '    {name}',
                    '    <br>',
                    '    {description}',
                    '</div>'
                ],
                store: 'Locations',
                onItemDisclosure: true
            }
        ]
    }

});