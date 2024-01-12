const cds = require("@sap/cds");

module.exports = (srv) => {
  const { Movie, Booking } = srv.entities;

  srv.on("CREATE", "InsertMovie", async (req, next) => {
    try {
      const existsData = await SELECT.from(Movie).where({ ID: req.data.ID });

      if (existsData.length > 0) return req.error(500, "data already exist");

      let result = await cds.tx(req).run(() => {
        return INSERT.into(Movie).entries(req.data);
      });
      if (result.results) return req.data;
    } catch (error) {
      return req.error;
    }
  });

  srv.on("CREATE", "UpdateMovie", async (req, next) => {
    try {
      let movieExist = await SELECT.from(Movie).where({ ID: req.data.ID });

      if (movieExist.length > 0) {
        let result = await cds.tx(req).run(() => {
          return UPDATE(Movie)
            .set({ ...req.data })
            .where({ ID: req.data.ID });
        });
        if (result === 0) req.error(500, "no data updated");
        return req.data;
      } else req.error("data not exist");
    } catch (error) {
      return req.error;
    }
  });
};

// learning

// srv.on("CustomAction", async (req) => {
//   // Implement the logic for CustomAction
//   // ...

//   // Return any results or perform necessary operations
//   return { result: "Action executed successfully" };
// });
// srv.on("createBooking", async (req) => {
//   const movieID = req.data.ID; // Assuming ID is the key property of Movie
//   const { customerName, email } = req.data;

//   // Check if the movie exists
//   const movie = await cds
//     .tx(req)
//     .run(SELECT.one.from(Movie).where({ ID: movieID }));

//   if (!movie) {
//     return req.error(404, `Movie with ID ${movieID} not found`);
//   }

//   // Create a new booking
//   const newBooking = await cds.tx(req).run(
//     INSERT.into(Booking).entries({
//       movie_ID: movieID,
//       customerName,
//       email,
//     })
//   );

//   // Return the created booking
//   return newBooking;
// });

// srv.on("READ", "Movie", async (req) => {
//   // Query building
//   let query = await SELECT.from(Movie);

//   return query;
// });

// srv.on("CREATE", "Movie", async (req) => {
//   try {
//     const an = req.data.name;
//     let result = await UPDATE(Movie)
//       .set({ name: an })
//       .where({ name: "Inception" });
//     console.log(result);
//     return req.data;
//   } catch (error) {
//     return req.error;
//   }
// });
