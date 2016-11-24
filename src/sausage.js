import startmailserver from './startmailserver.js'
import startwebserver from './startwebserver.js'
import startpopserver from './startpopserver.js'

startmailserver();
startwebserver(3000);
startpopserver();
