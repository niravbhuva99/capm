// using {cuid, managed } from '@sap/cds/common';
// namespace movies;

// entity Movie : cuid {
//  key ID: UUID;
//   name: String;
//   description: String;
//   release_date: Date;
//   price: Decimal;
//   bookings: Association to many Booking on bookings.movie_ID = $self.ID;
//   reviews: Association to many Review on reviews.movie_ID = $self.ID;
// }

// entity Booking {
//   key ID: UUID;
//   movie_ID: UUID;
//   movie: Association to Movie on movie.ID = movie_ID;
//   customerName: String;
//   email: String;
// }

// entity Review {
//   key ID: UUID;
//   movie_ID: UUID;
//   movie: Association to Movie on movie.ID = movie_ID;
//   rating: Integer;
//   comment: String;
//   createdBy: String;
//   createdAt: DateTime;
// }

using {cuid, managed } from '@sap/cds/common';
namespace movies;

entity Movies : cuid {
 key ID: Integer;
  name: String;
  description: String;
  release_date: Date;
  price: Decimal;
  bookings: Association to many Bookings on bookings.movie = $self;
  reviews: Association to many Reviews on reviews.movie= $self;
}

entity Bookings {
  key ID: Integer;
  movie: Association to Movies;
  customer: Association to Customers
}

entity Reviews {
  key ID: Integer;
  movie: Association to Movies;
  rating: Integer;
  comment: String;
  customer: Association to Customers;
  createdAt: DateTime;
}

entity Customers {
  key ID: Integer;
  name:String(50);
  booking : Association to many Bookings on booking.customer =$self;
  review:Association to many Reviews on review.customer =$self
}