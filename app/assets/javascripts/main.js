$(document).ready(function(){

    var getDatamap,
        remoteData = {},
        remoteSuccessHandler,
        popupHandler;

    // Function invoked after 'successfully' getting remote data
    remoteSuccessHandler = function(data){
        var entry;
        console.log("success");

        // Xform data for the Datamap
        data.forEach(function(el){
            entry = {};
            entry['fillKey'] = el.fill_color;
            entry['reincarcerated'] = el.reincarcerated;
            entry['popAtRisk'] = el.pop_at_risk;
            entry['percent'] = el.percent;
            remoteData[el.abbreviation] = entry;
        });

        // draw the map
        getDatamap(remoteData);
    };


    // remote request to get data.
    $.get('/states/index.json')
        popupHandler = function(geo, data) {
         // Markup for the popup
            return ['<div class="hoverinfo"><strong> ',
                geo.properties.name,
                '<br> At Risk Population',
                ': ' + data.popAtRisk,
                '<br> Number Re-Incarcerated: ',
                ': ' + data.reincarcerated,
                '<br> Percent: ',
                ': ' + data.percent,
                '</strong></div>'].join('');
     };


    // Draw the map
    getDatamap = function(data){
        var map = new Datamap({
            element: document.getElementById('container'),
            fills: {
                // defaultFill: 'rgba(23,48,210,0.9)' //any hex, color name or rgb/rgba value
                HIGH: 'red',
                LOW: 'green',
                MEDIUM: 'yellow',
                UNKNOWN: 'gray',
                defaultFill: 'gray'
            },
            scope: 'usa',
            data: data,
            geographyConfig: {
                // TODO: reformat the data coming back from the server
                // to conform to Datamap format.
                // Currently is an Object with and an array of state objects.
                // Shb an object with entries for each state, were keys are the 2 char state code.
                // dataUrl: '/state_recividisms/index.json',

                popupTemplate: popupHandler
            }
        });
        map.legend({legendTitle: "Recidivism rate by State"});
    };
    $.get('/states/index.json')
        .success(remoteSuccessHandler.bind(this));
});
