using movies from '../db/movies';


service movieBookingService @(path:'mbs'){
 
@odata.draft.enabled 
@cds.redirection.target: true

 entity Movie as projection on movies.Movies;
 @insertonly entity InsertMovie as projection on movies.Movies;
 entity UpdateMovie as projection on movies.Movies;


 @readonly entity Bookings as projection on movies.Bookings;
 @readonly entity Reviews as projection on movies.Reviews;


}

