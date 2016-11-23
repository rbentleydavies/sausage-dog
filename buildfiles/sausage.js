const {SMTPServer} = require('smtp-server');

const server = new SMTPServer({
    logger: true,
    onData(stream, session, callback){
        stream.pipe(process.stdout); // print message to console
        stream.on('end', callback);
    },
    disabledCommands: ['AUTH', 'STARTTLS'],
});

server.listen(25);
