import mongoose from "mongoose";

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const flightSchema = new Schema({
    _id: ObjectId,
  "flight_id": {
    "type": "String"
  },
  "depatureDestination": {
    "type": "String"
  },
  "arrivalDestination": {
    "type": "String"
  },
  "itineraries": {
    "type": [
      "Mixed"
    ]
  }
})

const flightModel = mongoose.model('flights', flightSchema)

export default flightModel




