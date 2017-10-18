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
            ['State', 'Violent Crimes per Capita','Population'],
          ['Alabama', 532.27, 4863300], 
          ['Alaska', 804.16, 741894],
          ['Arizona', 470.10, 6931071],
          ['Arkansas', 550.86, 2988248,],
          ['California', 445.34, 39250017],
          ['Colorado', 342.62, 5540545],
          ['Connecticut', 227.12, 3576452],
          ['Delaware', 508.79, 952065],
          ['Florida', 430.32, 20612439],
          ['Georgia', 397.56, 10310371],
          ['Hawaii', 309.19, 1428557],
          ['Idaho', 230.28, 1683140],
          ['Illinois', 436.30, 12801539],
          ['Indiana', 404.72, 6633053],
          ['Iowa', 290.62, 3134693],
          ['Kansas', 380.42, 2907289],
          ['Kentucky', 232.32, 4436974],
          ['Louisiana', 566.08, 4681666],
          ['Maine', 376.95, 1331479],
          ['Maryland', 472.04, 6016447],
          ['Massachusetts', 376.95, 6811779],
          ['Michigan', 459.01, 9928300],
          ['Minnesota', 242.65, 5519952],
          ['Mississippi', 459.01, 2988726],
          ['Missouri', 519.35, 6093000],
          ['Montana', 368.34, 1042520],
          ['Nebraska', 291.02, 1907116],
          ['Nevada', 678.09, 2940058],
          ['New Hampshire', 197.56, 1334795],
          ['New Jersey', 245.00, 8944468],
          ['New Mexico', 702.49, 2081015],
          ['New York', 376.22, 19745289],
          ['North Carolina', 372.23, 10146788],
          ['North Dakota', 251.07, 757952],
          ['Ohio', 300.29, 11614373],
          ['Oklahoma', 300.29, 3923561],
          ['Oregon', 264.57, 4093465],
          ['Pennsylvania', 316.38, 12784227],
          ['Rhode Island', 238.92, 1056426],
          ['South Carolina', 501.82, 4961119],
          ['South Dakota', 418.39, 865454],
          ['Tennessee', 632.92, 6651194],
          ['Texas', 434.42, 27862596],
          ['Utah', 242.76, 3051217],
          ['Vermont', 158.34, 624594],
          ['Virginia', 217.58, 8411808],
          ['Washington', 302.18, 7288000],
          ['West Virginia', 358.09, 1831102],
          ['Wisconsin', 305.93, 5778708],
          ['Wyoming', 244.24, 585501],
        ]);

        var options = {
            // region: '002', // North America
            colorAxis: { colors: ['#ffffff', '#e6f0ff', '#cce0ff', '#b3d1ff', '#99c2ff', '#80b3ff', '#66a3ff', '#4d94ff', '#3385ff', '#1a75ff'] },
            backgroundColor: 'transparent',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
            // width: 1300, 
            height: 300, 
            region: "US", 
            resolution: "provinces",
            legend: {text: 'hello'}
        };
        var geochart = new google.visualization.GeoChart(
            document.getElementById('geochart'));
        geochart.draw(data, options);

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

    $('#clear').on('click', function() {
        $('.table-like').html('');
        // $('.table-like').css('height', '0px');
        userStates = [];
    })
})