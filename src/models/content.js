import pkg from 'mongoose';
const {Schema, model} = pkg;



const contentSchemma = new Schema({
    title: String,
    year: Number,
    info:{
        directors:[String],
        release_date:Date,
        rating:Number,
        genres: [String],
        image_url: String,
        plot:String,
        rank:Number,
        running_time_secs:Number,
        actors:[String],
        triler_url:String,
        video_url: String,
        type: String,
    }
});

export default model('content', contentSchemma, 'content')