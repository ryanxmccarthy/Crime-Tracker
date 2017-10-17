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

    var stateAbbrevs = ["AL", "AK", "AZ", "AR", 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"] 

    var userStates = []

    $('#submit').on('click', function() {
        event.preventDefault();

        var z = $('#search').val().toUpperCase();

        if(stateAbbrevs.indexOf(z) === -1) {
            $('#firstModal').modal('show')
        } else {
            if(userStates.indexOf(z) != -1) {
                $('#secondModal').modal('show')
            } else {
                userStates.push(z)
            
                var key = 'O8BbfShMy4XlOSUGouj8GWAL2aYQpUavro0QLe12';
                var queryURL = 'https://api.usa.gov/crime/fbi/ucr/estimates/states/' + z + '?page=3&per_page=10&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv';

                $.ajax({
                        url: queryURL,
                        method: "GET"
                })
                .done(function(response) {
                    var newLi = $("<li class='table-like__item'><div class='name'>" + 
                    response.results[0].state_abbr + "</div><div class='number1'>" + 
                    response.results[0].population + "</div>" + "<div class='number2'>" + 
                    response.results[0].violent_crime + "</div><div class='number3'>" + 
                    response.results[0].homicide + "</div>" + "<div class='number4'>" + 
                    response.results[0].rape_legacy + "</div><div class='number5'>" + 
                    response.results[0].robbery + "</div><div class='number6'>" + 
                    response.results[0].aggravated_assault + "</div>" +
                    "</li>"
                    );
                    $('.table-like').append(newLi).isotope( 'appended', newLi );
                })
            }
        }     

        $('#search').val('');
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

            if (userStates.indexOf(z) != -1) {
                $('#secondModal').modal('show')
            } else {
                userStates.push(z)
            
                var key = 'O8BbfShMy4XlOSUGouj8GWAL2aYQpUavro0QLe12';
                var queryURL = 'https://api.usa.gov/crime/fbi/ucr/estimates/states/' + z + '?page=4&per_page=7&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv';

                $.ajax({
                        url: queryURL,
                        method: "GET"
                })
                .done(function(response) {
                    var newLi = $("<li class='table-like__item'><div class='name'>" + 
                    response.results[0].state_abbr + "</div><div class='number1'>" + 
                    response.results[0].population + "</div>" + "<div class='number2'>" + 
                    response.results[0].violent_crime + "</div><div class='number3'>" + 
                    response.results[0].homicide + "</div>" + "<div class='number4'>" + 
                    response.results[0].rape_legacy + "</div><div class='number5'>" + 
                    response.results[0].robbery + "</div><div class='number6'>" + 
                    response.results[0].aggravated_assault + "</div>" +
                    "</li>"
                    );
                    $('.table-like').append(newLi).isotope( 'appended', newLi );
                })
            }
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
        number1: '.number1 parseInt',
        number2: '.number2 parseInt',
        number3: '.number3 parseInt',
        number4: '.number4 parseInt',
        number5: '.number5 parseInt',
        number6: '.number6 parseInt',
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