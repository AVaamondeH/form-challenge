const server = require('./src/server.js');
const { conn } = require('./src/db.js');


const port = process.env.PORT ?? 3001

conn.sync({ force: true }).then(async () => {
    server.listen(port, () => {
        console.log(`% listening at ${port}`);
    });
}); 
