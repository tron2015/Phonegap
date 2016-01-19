// Add deviceready event
document.addEventListener("deviceready", onDeviceReady, false);

// Function that runs when device is ready
function onDeviceReady() {

    // Options for the navigator
    var options = {
        frequency: 16
    }; // Update ~60 fps

    var watchID = navigator.compass.watchHeading(onSuccess, onError, options);
}

// Runs when compass heading is sucessfully gathered
function onSuccess(heading) {
    // Draw the compass with the new heading
    drawCompass(heading.magneticHeading);
};

// Runs when errors occur trying to gather compass heading
function onError(compassError) {
    alert('Compass error: ' + compassError.code);
};

// Draws the compass and all its components
function drawCompass(angle) {
	// Display degrees
	document.querySelector(".angle").innerHTML = "&deg;" + angle;

	// Properties for the compass	
	var compass = {
		width: 300,
	    height: 300,
	    middle: 150,
	    needle: {
	        length: 90,
	        width: 7,
	        north: {
	        	endpoint: {},
	            startpoints: {
	            	one: {},
	            	two: {},
	        	}
	        },
	    	south: {
	        	endpoint: {},
	            startpoints: {
	            	one: {},
	            	two: {},
	        	}
	        },
	    },
		color: {			
	        north: "#e74c3c",
			south: "#ecf0f1",
	        text: "#fff"
		},
	    el: document.getElementById("compass"),
	    init: function() {
	        // Set needle endpoints
	    	this.needle.north.endpoint.x = Math.round(this.needle.length * Math.cos(angle * Math.PI / 180)) + this.middle;
	        this.needle.north.endpoint.y = Math.round(this.needle.length * Math.sin((angle + 180) * Math.PI / 180) + this.middle);
	        
	        this.needle.south.endpoint.x = Math.round(this.needle.length * Math.cos((angle + 180) * Math.PI / 180)) + this.middle;
	        this.needle.south.endpoint.y = Math.round(this.needle.length * Math.sin((angle) * Math.PI / 180) + this.middle);
	        
	        // Set startpoints 1 and 2
	        this.needle.north.startpoints.one.x = Math.round(this.needle.width * Math.cos((angle - 90) * Math.PI / 180)) + this.middle;
	        this.needle.north.startpoints.one.y = Math.round(this.needle.width * Math.sin((angle + 180 - 90) * Math.PI / 180)) + this.middle;
	        
	        this.needle.north.startpoints.two.x = Math.round(this.needle.width * Math.cos((angle + 90) * Math.PI / 180)) + this.middle;
	        this.needle.north.startpoints.two.y = Math.round(this.needle.width * Math.sin((angle + 180 + 90) * Math.PI / 180)) + this.middle;
	        
	        this.needle.south.startpoints.one.x = Math.round(this.needle.width * Math.cos((angle - 90 - 180) * Math.PI / 180)) + this.middle;
	        this.needle.south.startpoints.one.y = Math.round(this.needle.width * Math.sin((angle - 90) * Math.PI / 180)) + this.middle;
	        
	        this.needle.south.startpoints.two.x = Math.round(this.needle.width * Math.cos((angle + 90 - 180) * Math.PI / 180)) + this.middle;
	        this.needle.south.startpoints.two.y = Math.round(this.needle.width * Math.sin((angle + 90) * Math.PI / 180)) + this.middle;
	        
	        return this;
		}
	}.init();
	
	var ctx = compass.el.getContext("2d");

	// Clear previous drawings
	ctx.clearRect(0, 0, compass.width, compass.height);

	// Draw directions
	ctx.font = "24px Arial";
	ctx.fillStyle = compass.color.text;
	ctx.textAlign = "center";
	ctx.fillText("N", compass.width/2, 35);
	ctx.fillText("S", compass.width/2, compass.height - 15);
	ctx.fillText("E", compass.width - 22, compass.middle + 8);
	ctx.fillText("W", 22, compass.middle + 8);

	// Draw needle
	ctx.beginPath(); // North needle
	ctx.moveTo(compass.middle, compass.middle);
	ctx.lineTo(compass.needle.north.startpoints.one.x, compass.needle.north.startpoints.one.y);
	ctx.lineTo(compass.needle.north.endpoint.x, compass.needle.north.endpoint.y);
	ctx.lineTo(compass.needle.north.startpoints.two.x, compass.needle.north.startpoints.two.y);
	ctx.lineTo(compass.middle, compass.middle);
	ctx.fillStyle = compass.color.north;
	ctx.strokeStyle = compass.color.north;
	ctx.fill();
	ctx.closePath();

	ctx.beginPath(); // South needle
	ctx.moveTo(compass.middle, compass.middle);
	ctx.lineTo(compass.needle.south.startpoints.one.x, compass.needle.south.startpoints.one.y);
	ctx.lineTo(compass.needle.south.endpoint.x, compass.needle.south.endpoint.y);
	ctx.lineTo(compass.needle.south.startpoints.two.x, compass.needle.south.startpoints.two.y);
	ctx.lineTo(compass.middle, compass.middle);
	ctx.fillStyle = compass.color.south;
	ctx.strokeStyle = compass.color.south;
	ctx.fill();

	ctx.beginPath(); // Divider line
	ctx.moveTo(compass.needle.south.startpoints.one.x, compass.needle.south.startpoints.one.y);
	ctx.lineTo(compass.needle.south.startpoints.two.x, compass.needle.south.startpoints.two.y);
	ctx.strokeStyle = "#333";
	ctx.fill();

	ctx.stroke();
}