// 這邊撰寫介面上對google map 的操作行為


var gmap;
		
		$(function(){
			var latlng  =  new google.maps.LatLng(24.73071, 121.76312);
	 
			gmap = new google.maps.Map(document.getElementById("map_div"), {
				zoom:14,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			
			$("#btnGetCenter").click(run);
			
		});
		
		function run(){
			if (navigator.geolocation)
			{
				var map;
				navigator.geolocation.getCurrentPosition(
					function(position){
						$("#msg").html(position.coords.latitude + "," + position.coords.longitude);
						gmap.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
						/*
						map = new google.maps.Map(document.getElementById("map_div"), {
							zoom: 14, 
							center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
							mapTypeId: google.maps.MapTypeId.ROADMAP 
						});*/
					},
					function(error) {
						$("#msg").html("error");					
					}			
				);
			}
			else
			{
				$("#msg").html("System can't get your geolocation. Your location will automatically set on Yilan government!");
			}
		}