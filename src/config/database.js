import mongoose from 'mongoose'

const { MONGODB_USER, MONGODB_PASS, MONGODB_HOST, MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/${MONGODB_DATABASE}`

export default mongoose.connect(MONGODB_URI)
    .then(db => console.log('database is connected'))
    .catch(err => {
        console.error('Server missing Database Config Mongo Env.')
        //console.error(err)
        process.exit(1)
    });