"use strict";

var phonegap = {};

phonegap.app = {
	
    initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
		FastClick.attach(document.body);
        
        if (!localStorage) {
            alert("Device not compatible");
            return;
        }
        
        StatusBar.hide();
        phonegap.app.loadStudents();
    },
    
    loadStudents: function() {
        $('#table').empty();

        for (var index = 0; index < localStorage.length; index++) {
            var key = localStorage.key(index);
            $('#table').append('<li>' + key + ' - ' + localStorage.getItem(key) + '</li>');
        }

        $('#table').listview('refresh');
    },
    
    newPair: function() {
        var name = $('#name').val();
        var results = $('#results').val();

        localStorage.setItem(name, results);
        phonegap.app.loadStudents(); // reload list

        $('#name').val('');
        $('#results').val('');
    },
    
    clean: function() {
        localStorage.clear();
        phonegap.app.loadStudents();
    }

};
