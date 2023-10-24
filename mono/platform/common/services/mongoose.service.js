import DotEnv from 'dotenv';
DotEnv.config();
import mongoose from 'mongoose';
const { connect } = mongoose;
const { dbUrl, authSource, user, password } = process.env;
let count = 0;
const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    connect(
        dbUrl, {
	        "auth": { "authSource": authSource },
        "authSource": authSource,
        "user": user,
        "pass": password
      }).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count, err);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();
export default mongoose;
