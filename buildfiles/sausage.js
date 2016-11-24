import startmailserver from '../src/startmailserver.js'
import startwebserver from '../src/startwebserver.js'
import startpopserver from '../src/startpopserver.js'

startmailserver();
startwebserver(3000);
startpopserver();
