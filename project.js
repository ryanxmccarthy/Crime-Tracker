$( document ).ready(function() {
	var config = {
	    apiKey: "AIzaSyBFp7nBu8SdIzmhy8UwszfaspzLnVzdtYs",
	    authDomain: "crime-project-5b66d.firebaseapp.com",
	    databaseURL: "https://crime-project-5b66d.firebaseio.com",
	    projectId: "crime-project-5b66d",
	    storageBucket: "crime-project-5b66d.appspot.com",
	    messagingSenderId: "789062813269"
	};

	firebase.initializeApp(config);

	var database = firebase.database();

	$('#submit').on('click', function() {
		event.preventDefault();

		var z = $('#search').val();

		database.ref().push({
	        name: z
	    });

	    database.ref().on("value", function(snapshot) {
	      var val = snapshot.val()

	      var table = $('#crimes');
			table.append(
				'<tr><td>' + snapshot.val() + '</td>' +
				'<td>' + roleName + '</td>' +
				'<td>' + childDate + '</td>' +
				'<td>' + monthsWorked + '</td>' +
				'<td>' + childRate + '</td>' +
				'<td>' + totalBilled + '</td></tr>'
			);      
	    }, function(err) {
	      alert('There was an error!')
	    })

	    var key = 'O8BbfShMy4XlOSUGouj8GWAL2aYQpUavro0QLe12';
	   	var queryURL = 'https://api.usa.gov/crime/fbi/ucr/estimates/states/' + z + '?page=3&per_page=10&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv';

	    $.ajax({
	        url: queryURL,
	        method: "GET"
	    })
	    .done(function(response) {
	  		var obj = response
		  	$('#crimes').text(obj.results[0])
		  	console.log(obj.results[0])
	    })
	})	

	//maps functionality
	google.charts.load('current', {
        'packages':['geochart'],
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });

    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
	    var data = google.visualization.arrayToDataTable([
	    	['State', 'Foo Factor'],
	    ]);

        var options = {
          region: '002', // North America
          colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
          backgroundColor: '#81d4fa',
          datalessRegionColor: '#f8bbd0',
          defaultColor: '#f5f5f5',
        };

        var geochart = new google.visualization.GeoChart(
      		document.getElementById('geochart'));
  			geochart.draw(data, {width: 556, height: 347, region: "US", resolution: "provinces"});

        // var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
        // chart.draw(data, options);
		google.visualization.events.addListener(geochart,'regionClick', function (eventData) {
            currentRegion = eventData.region;
            options['region'] = eventData.region;
        	options['resolution'] = 'provinces';
	    	var state = currentRegion;
	    	//removes first three characters
			var x = state.split('');
			var y = x.splice(3, 2);
			var z = y.join('');

			database.ref().push({
		    	state: z
		    });

		    database.ref().on("value", function(snapshot) {
		    	var val = snapshot.val()
		    }, function(err) {
		    	alert('There was an error!')
		    })

		    var key = 'O8BbfShMy4XlOSUGouj8GWAL2aYQpUavro0QLe12';
		   	var queryURL = 'https://api.usa.gov/crime/fbi/ucr/estimates/states/' + z + '?page=4&per_page=7&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv';

		    $.ajax({
		        url: queryURL,
		        method: "GET"
		    })
		    .done(function(response) {
		    	var obj = response
		  		$('#crimes').text(obj.results[0])
		  		console.log(obj.results[0])
		    })
		})
    };
})