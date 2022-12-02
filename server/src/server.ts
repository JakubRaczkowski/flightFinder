import { Express } from "express";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import bodyparser from "body-parser";
import db from "./util/database";
import flights from "./models/flights";
config();

const PORT = 5000;
const app: Express = express();
app.use(cors());
app.use(bodyparser.json());

app.post("/search", async (req, res) => {
  const {
    departureDate,
    returnDate,
    departureFrom,
    arrivalTo,
    adultPassenger,
    childPassenger,
    roundTrip,
  } = req.body;

  const flightsList = await flights.find({});

  const firstRoute = flightsList.filter(
    flight =>
      flight.depatureDestination === departureFrom &&
      flight.arrivalDestination === arrivalTo
  );
  
  const firstRouteDates = firstRoute
    .map(flight => flight.itineraries)
    .flat()
    //@ts-ignore
    .filter(itinerary => itinerary.depatureAt.includes(departureDate));


  const itineraries = firstRoute[0].itineraries;
  console.log(firstRoute[0].depatureDestination,'departure from');

  const firstFlight = {
    flight_id: firstRoute[0].flight_id,
    departureFrom: firstRoute[0].depatureDestination,
    arrivalTo: firstRoute[0].arrivalDestination,
    itineraries: firstRouteDates,
    adultPassenger,
    childPassenger,
  };

  let secondFlight;

  const lookUpSecondFlight = () => {
    if (roundTrip) {
      const returnRoute = flightsList.filter(
        flight =>
          flight.depatureDestination === arrivalTo &&
          flight.arrivalDestination === departureFrom
      );

      const returnRouteDates = returnRoute
        .map(flight => flight.itineraries)
        .flat()
        //@ts-ignore
        .filter(itinerary => itinerary.depatureAt.includes(returnDate));

      const returnItineraries = returnRoute[0].itineraries;
      secondFlight = {
        flight_id: returnRoute[0].flight_id,
        departureFrom: returnRoute[0].depatureDestination,
        arrivalTo: returnRoute[0].arrivalDestination,
        itineraries: returnRouteDates,
        adultPassenger,
        childPassenger,
        
      };
      return secondFlight;
    }
    return;
  };
  lookUpSecondFlight()

  const responseObject = {
    firstFlight,
    secondFlight,
    roundTrip
  };
  console.log(JSON.stringify(responseObject));

  res.send(JSON.stringify(responseObject));
});

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
