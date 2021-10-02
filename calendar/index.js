const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
// const tkn = req.body

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.//Running
const initCalendar = (token_g) => {
  fs.readFile(__dirname+'/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents,token_g);
  });
}

const authorize = (credentials, callback, token_g) => {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback, token_g);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

const getAccessToken = (oAuth2Client, callback, token_g) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
   
  
  oAuth2Client.getToken(token_g, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    oAuth2Client.setCredentials(token);
    // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return console.error(err);
      console.log('Token stored to', TOKEN_PATH);
    });
    callback(oAuth2Client);
  });

}


const listEvents = async(auth) => {
  const calendar = await google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      return events
      // console.log('Upcoming 10 events:');
      // events.map((event, i) => {
      //   const start = event.start.dateTime || event.start.date;
      //   console.log(`${start} - ${event.summary}`);
      // });
    } else {
      // console.log("nothing");
      return [];
    }
  });
}

module.exports = {
  initCalendar,
  authorize,
  getAccessToken,
  listEvents
}