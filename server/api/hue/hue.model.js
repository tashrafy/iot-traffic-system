import mongoose from 'mongoose';

var HueSchema = new mongoose.Schema({
  name: {
    type: String
  },
  rate: {
    type: Number
  }
});

export default mongoose.model('Hue', HueSchema);
