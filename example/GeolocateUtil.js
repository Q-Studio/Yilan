var defaultLatLng = new google.maps.LatLng(24.73071, 121.76312); // Yilan Government 
var currentLatLng = defaultLatLng;
	
function initialize(successCallback)
{
		if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(
				successCallback,
				function(error) {
					switch(error.code) {
						case error.TIMEOUT:
						break;
						case error.PERMISSION_DENIED:
						break;
						case error.POSITION_UNAVAILABLE:
						break;
					};
					console.log("[DEBUGGING] ErrorCode[" + error.code + "] Msg: " + error.message);
				}			
			);
		}
		else
		{
			alert("System can't get your geolocation. Your location will automatically set on Yilan government!");
		}
}


function drawMap( latLng )
{
	return new google.maps.Map(document.getElementById("map_canvas"), {
		zoom: 16, 
		center: latLng, 
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	});
}
	
function addMakers( type , arrLocation ){
	//Uncaught ReferenceError: Invalid left-hand side in assignment 
		if( typeof(arrLocation) === "undefined" || (arrLocation instanceof Array && arrLocation.length == 0) ) { 
		arrLocation = new Array(); 
		arrLocation.push(defaultLatLng);
	} 
	
	if( arrLocation instanceof google.maps.LatLng ) {
		var tmpLatLng = arrLocation;
		arrLocation = new Array(); 
		arrLocation.push(tmpLatLng);
	} 

	for( var i = 0; i < arrLocation.length; i++ ) {
		if(type == "center"){
			new google.maps.Marker({
				position: new google.maps.LatLng(arrLocation[i].lat(), arrLocation[i].lng()), 
				title: "現在位置", 
				icon: createMarkerIcon( "現在位置",{ bgColor: 'red' }),
				map: map 
			});
		} else {
			new google.maps.Marker({
				position: new google.maps.LatLng(arrLocation[i].lat, arrLocation[i].lng), 
				title: arrLocation[i].name, 
				icon: createMarkerIcon( i+1,{ bgColor: 'darkred'}),
				map: map 
			});
		};
	}		
}

function createMarkerIcon(text, opt) {

			var defaultOptions = {
				fontStyle: "normal", 
				fontName: "Arial",
				fontSize: 12, 
				bgColor: "darkblue",
				fgColor: "white",
				padding: 4,
				arrowHeight: 6 
			};
			options = $.extend(defaultOptions, opt);

			var canvas = document.createElement("canvas"),
				context = canvas.getContext("2d");

			var font = options.fontStyle + " " + options.fontSize + "px " + 
					   options.fontName;
			context.font = font;
			var metrics = context.measureText(text);
		   
			var w = metrics.width + options.padding * 2;
	   
			var h = options.fontSize + options.padding * 2 +
					options.arrowHeight;
			canvas.width = w;
			canvas.height = h;
		   
			context.beginPath();
			context.rect(0, 0, w, h - options.arrowHeight);
			context.fillStyle = options.bgColor;
			context.fill();
			
			context.beginPath();
			var x = w / 2, y = h, arwSz = options.arrowHeight;
			context.moveTo(x, y);
			context.lineTo(x - arwSz, y - arwSz);
			context.lineTo(x + arwSz, y - arwSz);
			context.lineTo(x, y);
			context.fill();

			context.textAlign = "center";
			context.fillStyle = options.fgColor;
			context.font = font;
			context.fillText(text,
				w / 2,
				(h - options.arrowHeight) / 2 + options.padding);

			return canvas.toDataURL();
		}