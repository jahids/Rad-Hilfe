import { Schema } from '../database';

const recreationalCommuteSchema = new Schema({
  days: {
    type: [String],
    require: true,
  },
  activityType: { type: [String], required: true },
  lengthOfRide: { type: Number, required: true },
});

export { recreationalCommuteSchema };
