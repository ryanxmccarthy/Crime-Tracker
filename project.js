$(document).ready(function() {
    $('.grid').isotope({
      // options
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    });

    var $grid = $('.grid').isotope({
      getSortData: {
        name: '.name', // text from querySelector
        category: '[data-category]', // value of attribute
        weight: function( itemElem ) { // function
          var weight = $( itemElem ).find('.weight').text();
          return parseFloat( weight.replace( /[\(\)]/g, '') );
        }
      }
    });

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

        var key = 'O8BbfShMy4XlOSUGouj8GWAL2aYQpUavro0QLe12';
        var queryURL = 'https://api.usa.gov/crime/fbi/ucr/estimates/states/' + z + '?page=3&per_page=10&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv';

        $.ajax({
                url: queryURL,
                method: "GET"
        })
        .done(function(response) {
            // console.log(response)
            $("#crimes").append(`
            <tr>    
                <td>${response.results[0].state_abbr}</td>
                <td>${response.results[0].population}</td>
                <td>${response.results[0].violent_crime}</td>
                <td>${response.results[0].homicide}</td>
                <td>${response.results[0].rape_legacy}</td>
                <td>${response.results[0].robbery}</td>
                <td>${response.results[0].aggravated_assault}</td>
            </tr>
            `);

            var div = $("<div class='element-item'>")
            div.innerHTML('<h4>' + response.results[0].state_abbr + '</h4>');
            $('.grid').append(div)
        })
    })

    google.charts.load('current', {
        'packages': ['geochart'],
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });

    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
            ['State', 'Foo Factor'],
        ]);

        var options = {
            region: '002', // North America
            colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
            backgroundColor: '#81d4fa',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
        };

        var geochart = new google.visualization.GeoChart(
            document.getElementById('geochart'));
        geochart.draw(data, { width: 556, height: 347, region: "US", resolution: "provinces" });

        google.visualization.events.addListener(geochart, 'regionClick', function(eventData) {
            currentRegion = eventData.region;
            options['region'] = eventData.region;
            options['resolution'] = 'provinces';
            var state = currentRegion;
            // console.log(state);
            var x = state.split('');
            var y = x.splice(3, 2);
            var z = y.join('');

            var key = 'O8BbfShMy4XlOSUGouj8GWAL2aYQpUavro0QLe12';
            var queryURL = 'https://api.usa.gov/crime/fbi/ucr/estimates/states/' + z + '?page=4&per_page=7&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv';

            $.ajax({
                    url: queryURL,
                    method: "GET"
            })
            .done(function(response) {
                // console.log(response)
                $("#crimes").append(`
                <tr>    
                    <td>${response.results[0].state_abbr}</td>
                    <td>${response.results[0].population}</td>
                    <td>${response.results[0].violent_crime}</td>
                    <td>${response.results[0].homicide}</td>
                    <td>${response.results[0].rape_legacy}</td>
                    <td>${response.results[0].robbery}</td>
                    <td>${response.results[0].aggravated_assault}</td>
                </tr>
                `);

                var newLi = $("<li class='table-like__item'><div class='name'>" + response.results[0].state_abbr + "</div><div class='crime'>" + response.results[0].violent_crime + "</div></li>");
                $('.table-like').append(newLi)
            })
        })
    };


    // isotope
        // external js: isotope.pkgd.js

    // init Isotope
    var $table = $('.table-like').isotope({
      layoutMode: 'vertical',
      getSortData: {
        name: '.name',
        symbol: '.symbol',
        number: '.number parseInt',
        category: '.category',
        weight: function( itemElem ) {
          var weight = $( itemElem ).find('.weight').text();
          return parseFloat( weight.replace( /[\(\)]/g, '') );
        }
      }
    });

    // bind sort button click
    $('#sorts').on( 'click', 'button', function() {
      var sortValue = $(this).attr('data-sort-value');
      $table.isotope({ sortBy: sortValue });
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });

})