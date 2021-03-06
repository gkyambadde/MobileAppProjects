Ext.define('LocationManager.controller.Locations', {
    extend: 'Ext.app.Controller',

    config: {
        models: [
            'Location'
        ],
        stores: [
            'Locations'
        ],

        refs: {
            mapView: {
                selector: 'mainview #map',
                xtype: 'Ext.Map'
            },
            mainView: {
                selector: 'mainview',
                xtype: 'Ext.navigation.View'
            },
            mapPanel: {
                selector: 'mainview #mapPanel',
                xtype: 'Ext.Panel'
            },
            addLocationButton: {
                selector: 'mainview #addLocationButton',
                xtype: 'Ext.Button'
            },
            listLocationsButton: {
                selector: 'mainview #listLocationsButton',
                xtype: 'Ext.Button'
            },
            newLocationMap: 'mainview #newLocationMap',
            newLocationForm: 'mainview #formPanel'
        },

        control: {
            "mainview #addLocationButton": {
                tap: 'onAddLocationTap'
            },
            "mainview #listPanel list": {
                disclose: 'onLocationTap',
                itemswipe: 'onLocationSwipe'
            },
            "mainview #listLocationsButton": {
                tap: 'onListLocationsTap'
            },
            "mainview": {
                back: 'onBack',
                activate: 'onStart'
            },
            "mainview #locationTextField": {
                change: 'onNewLocationPositionChange'
            },
            "mainview #saveLocationButton": {
                tap: 'onSaveLocationButtonTap'
            }
        }
    },

    onAddLocationTap: function(button, e, eOpts) {
        // Show the "add new location" panel
        this.getMainView().push({
            xtype: 'formpanel',
            title: 'NEW LOCATION'
        });

        // Hide the toolbar buttons
        this.hideButtons();
    },

    onLocationTap: function(list, record, target, index, e, eOpts) {
        // Build the location
        var latitude = record.get('latitude'),
            longitude = record.get('longitude'),
            location = new google.maps.LatLng(latitude, longitude);

        // Find the map
        var map = this.getMapView();

        // Center the map at the location
        map.setMapOptions({
            center: location
        });

        // Show toolbar buttons
        this.showButtons();

        // Remove the location list panel
        this.getMainView().pop();
    },

    onListLocationsTap: function(button, e, eOpts) {
        // Show the list panel view
        this.getMainView().push({
            xtype: 'listpanel',
            title: 'List spot'
        });

        // Hide toolbar buttons
        this.hideButtons();
    },

    onBack: function(navigationview, eOpts) {
        // Show toolbar buttons
        this.showButtons();
    },

    onStart: function(newActiveItem, container, oldActiveItem, eOpts) {
        // Show toolbar buttons
        this.showButtons();
    },

    onNewLocationPositionChange: function(textfield, newValue, oldValue, eOpts) {
        // Find the map
        var map = this.getNewLocationMap().getMap();

        // Build a marker if there isn't one
        if (!this.newLocationMapMarker) {
            this.newLocationMapMarker = new google.maps.Marker();
        }

        // Hide the map marker
        this.newLocationMapMarker.setMap(null);

        // Geocode the string
        var me = this;
        this.geocodeString(newValue, function(position) {

            // Move the map to the position
            map.setOptions({
                center: position,
                zoom: 15
            });

            // Drop a marker there
            me.newLocationMapMarker.setOptions({
                map: map,
                position: position,
                animation: google.maps.Animation.DROP
            });

        });
    },

    onSaveLocationButtonTap: function(button, e, eOpts) {
        // Get the form and its values
        var form = this.getNewLocationForm(),
            values = form.getValues();

        // Get the locations store
        var store = Ext.getStore('Locations');

        // Get the map object
        var map = this.getMapView().getMap();

        // Geocode the string, and then...
        var me = this;
        this.geocodeString(values.location, function(position) {

            // If there's a valid position...
            if (position) {

                // Add this to the store
                store.add({
                    name: values.name,
                    description: values.description,
                    latitude: position.lat(),
                    longitude: position.lng()
                });

                // Build a list of markers if we don't have one
                if (!me.markers) {
                    me.markers = [];
                }

                // Drop a marker
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    animation: google.maps.Animation.DROP
                });
                me.markers.push(marker);

                // Move the map there
                map.setOptions({
                    center: position
                });

                // Go back to the map view
                me.getMainView().pop();

                // Show the navbar buttons
                me.showButtons();

            }

        });
    },

    onLocationSwipe: function(dataview, index, target, record, e, eOpts) {
        // Build the title and message
        var title = 'Delete',
            message = 'Delete ' + record.get('name') + '?';

        // Confirm the deletion, and then...
        var me = this;
        Ext.Msg.confirm(title, message, function(response) {

            // If we get a "yes"...
            if (response == 'yes') {

                // Get the store
                var store = Ext.getStore('Locations');

                // Do the deletion from the store
                store.remove(record);

                // Find and remove the marker
                me.markers.forEach(function(marker, index) {

                    // Get the values to compare
                    var markerLat = marker.getPosition().lat(),
                        markerLng = marker.getPosition().lng(),
                        removedLat = record.get('latitude'),
                        removedLng = record.get('longitude');

                    // Should we remove them?
                    // This will remove two markers at the same location.
                    if ((markerLat == removedLat) && (markerLng == removedLng)) {
                        marker.setMap(null);
                        me.markers.splice(index, 1);
                    }

                });

                // If we've removed the last one, go back to the main menu
                if (store.getCount() === 0) {
                    me.getMainView().pop();
                    me.showButtons();
                }

            }

        });
    },

    showButtons: function() {
        // Do we have any locations to show?
        var locationCount = Ext.getStore('Locations').getCount(),
            hasLocations = (locationCount !== 0);

        // Show the "add location" button
        this.getAddLocationButton().show();

        // Show the "list locations" button if we should
        if (hasLocations) {
            this.getListLocationsButton().show();
        } else {
            this.getListLocationsButton().hide();
        }
    },

    hideButtons: function() {
        // Show both buttons on the toolbar
        this.getAddLocationButton().hide();
        this.getListLocationsButton().hide();
    },

    geocodeString: function(str, callback) {
        // Build a Google Maps geocoder and its options
        var geocoder = new google.maps.Geocoder(),
            options = { address: str };

        // Turn the string into a location
        geocoder.geocode(options, function(results, status) {
            if (status == "OK") {
                callback(results[0].geometry.location);
            } else {
                callback(null);
            }
        });
    }

});