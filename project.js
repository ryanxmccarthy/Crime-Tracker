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
            ['State', 'Crime Rate (per 1,000 Residents)','Population'],
            ['Alabama', 5.32, 4863300], 
          ['Alaska', 8.04, 741894],
          ['Arizona', 4.70, 6931071],
          ['Arkansas', 5.51, 2988248,],
          ['California', 4.45, 39250017],
          ['Colorado', 3.43, 5540545],
          ['Connecticut', 2.27, 3576452],
          ['Delaware', 5.19, 952065],
          ['Florida', 4.30, 20612439],
          ['Georgia', 3.98, 10310371],
          ['Hawaii', 3.09, 1428557],
          ['Idaho', 2.30, 1683140],
          ['Illinois', 4.36, 12801539],
          ['Indiana', 4.05, 6633053],
          ['Iowa', 2.90, 3134693],
          ['Kansas', 3.80, 2907289],
          ['Kentucky', 2.32, 4436974],
          ['Louisiana', 5.66, 4681666],
          ['Maine', 3.77, 1331479],
          ['Maryland', 4.72, 6016447],
          ['Massachusetts', 3.77, 6811779],
          ['Michigan', 4.59, 9928300],
          ['Minnesota', 2.43, 5519952],
          ['Mississippi', 4.59, 2988726],
          ['Missouri', 5.19, 6093000],
          ['Montana', 3.68, 1042520],
          ['Nebraska', 2.91, 1907116],
          ['Nevada', 6.78, 2940058],
          ['New Hampshire', 1.98, 1334795],
          ['New Jersey', 2.45, 8944468],
          ['New Mexico', 7.02, 2081015],
          ['New York', 3.76, 19745289],
          ['North Carolina', 3.72, 10146788],
          ['North Dakota', 2.51, 757952],
          ['Ohio', 3.00, 11614373],
          ['Oklahoma', 3.00, 3923561],
          ['Oregon', 2.65, 4093465],
          ['Pennsylvania', 3.16, 12784227],
          ['Rhode Island', 2.39, 1056426],
          ['South Carolina', 5.02, 4961119],
          ['South Dakota', 4.18, 865454],
          ['Tennessee', 6.33, 6651194],
          ['Texas', 4.34, 27862596],
          ['Utah', 2.42, 3051217],
          ['Vermont', 1.58, 624594],
          ['Virginia', 2.18, 8411808],
          ['Washington', 3.02, 7288000],
          ['West Virginia', 3.58, 1831102],
          ['Wisconsin', 3.06, 5778708],
          ['Wyoming', 2.44, 585501],
        ]);

        var options = {
            // region: '002', // North America
            colorAxis: { colors: ['#ffffff', '#e6f0ff', '#cce0ff', '#b3d1ff', '#99c2ff', '#80b3ff', '#66a3ff', '#4d94ff', '#3385ff', '#1a75ff'] },
            backgroundColor: 'transparent',
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

       $('.reset').on('click', function(){
          drawRegionsMap();
        })
        
        google.visualization.events.addListener(geochart, 'regionClick', function(eventData) {
            currentRegion = eventData.region;
            options['region'] = eventData.region;
            options['resolution'] = 'provinces'; 
            if (currentRegion.substring(0, 5) === "US-NC") {
                // If it is a US city
                options['displayMode'] = 'markers';

                var data = google.visualization.arrayToDataTable([
                    ['City', 'Crime Rate (per 1,000 Residents)', 'Population'],
                    ['Charlotte, NC', 6.93, 731424],
                    ['Raleigh, NC', 4.20, 403892],
                    ['Chapel Hill, NC', 2.13, 57233],
                    ['Durham, NC', 8.69, 228330],
                    ['Hillsborough, NC', 2.18, 6087],
                    ['Wilmington, NC', 7.88, 106476],
                    ['Greensboro, NC', 6.14, 269666],
                    ['Asheville, NC', 5.25, 83393],
                    ['Boone, NC', 2.20, 17122],
                    ['Winston-Salem, NC', 7.98, 229617],
                ]);  
            geochart.draw(data, options);
            } 

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

        $('#clear').on('click', function() {
            $('.table-like').html('');
            $('#default').addClass('is-checked');
            userStates = [];
        })
    });

    
})