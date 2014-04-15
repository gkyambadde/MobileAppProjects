Ext.define('LocationManager.view.FormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formpanel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.TextArea',
        'Ext.Button',
        'Ext.Map'
    ],

    config: {
        id: 'formPanel',
        scrollable: false,
        items: [
            {
                xtype: 'fieldset',
                itemId: 'formFieldSet',
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'nameTextField',
                        label: 'Name',
                        labelWrap: true,
                        name: 'name',
                        required: true,
                        autoCapitalize: true,
                        autoComplete: false,
                        autoCorrect: true,
                        placeHolder: 'IHK Building'
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'locationTextField',
                        label: 'Location',
                        labelWrap: true,
                        name: 'location',
                        required: true,
                        placeHolder: 'Namuwongo, Kisugu Kampala'
                    },
                    {
                        xtype: 'textareafield',
                        itemId: 'descriptionTextArea',
                        label: 'Description',
                        labelWrap: true,
                        name: 'description'
                    },
                    {
                        xtype: 'button',
                        itemId: 'saveLocationButton',
                        margin: 10,
                        text: 'Add location'
                    },
                    {
                        xtype: 'map',
                        height: 250,
                        itemId: 'newLocationMap'
                    }
                ]
            }
        ]
    }

});