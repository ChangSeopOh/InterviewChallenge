const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const mongoosePaginate = require('mongoose-paginate');

const ColorSchema = new Schema({
	color : String,
	group : String,
	hex : String 
});

  
ColorSchema.plugin(mongoosePaginate);
 
module.exports = mongoose.model('Color', ColorSchema);
 