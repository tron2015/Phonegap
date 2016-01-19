"use strict";

var phonegap = {};

phonegap.app = {
	
    initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        StatusBar.hide();
        FastClick.attach(document.body);

        $("#cambiarACreacion").click(function() {
            $('#nombre').val('');
            $('#telefono').val('');
            $.mobile.changePage($("#crearContacto"), "slide", true, true);
        });
        $(".volver").click(function() {
            $('#filter').val('');
            $.mobile.changePage($("#agenda"), "slide", true, true);
        });
        $("#buscar").click(function() {
            phonegap.app.find();
        });
        $("#crear").click(function() {
            phonegap.app.create($('#nombre').val(), $('#telefono').val());
        });
    },

    // Nuevo contacto a partir de un nombre y un número de teléfono
    create: function(nombre, telefono) {
        var contacto = navigator.contacts.create({
            "displayName": nombre,
            "phoneNumbers": [{
                "type": "String",
                "value": telefono,
                "pref": true
            }]});
        contacto.save();
        alert('Contacto creado');
    },

    // Filtrado de contactos a partir de la agenda del dispositivo
    find: function() {
        var contactFindOptions = new ContactFindOptions();
        contactFindOptions.filter = $('#filter').val();
        contactFindOptions.multiple = true;

        navigator.contacts.find(['displayName'], phonegap.app.onSuccess, phonegap.app.onError, contactFindOptions);
    },

    onSuccess: function(contacts) {
        $.mobile.changePage($("#resultadosBusqueda"), "slide", true, true);

        $('#tabla').empty();
        contacts.forEach(function(entry, index) {
            $('#tabla').append('<li>' + entry.displayName + '</li>');
        });

        $('#tabla').listview('refresh');
    },

    onError: function(contactError) {
        alert(contactError);
    }
};
