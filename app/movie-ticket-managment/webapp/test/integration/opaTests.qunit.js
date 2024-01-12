sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'movieticketmanagment/test/integration/FirstJourney',
		'movieticketmanagment/test/integration/pages/MovieList',
		'movieticketmanagment/test/integration/pages/MovieObjectPage'
    ],
    function(JourneyRunner, opaJourney, MovieList, MovieObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('movieticketmanagment') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMovieList: MovieList,
					onTheMovieObjectPage: MovieObjectPage
                }
            },
            opaJourney.run
        );
    }
);