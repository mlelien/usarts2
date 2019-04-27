const path = require('path')
const express = require('express')
const cors = require('cors')
const { google } = require('googleapis')
const bodyParser = require('body-parser')
const logger = require('morgan')
const privatekey = require('./sheets.json')

const port = process.env.PORT || 3000
const app = express()
app.use(cors())

const publicPath = path.join(__dirname, 'public')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

const jwtClient = new google.auth.JWT(privatekey.client_email,
  null,
  privatekey.private_key, [
    'https://www.googleapis.com/auth/spreadsheets',
  ])
// authenticate request
jwtClient.authorize((err) => {
  // at this point the authentication is done you can now use `jwtClient`
  // to read or write to the spreadsheet
  if (err) {
    console.log('error')
    console.log(err)
  } else {
    console.log('success')
  }
})

app.post('/api/getList', (req, res) => {
  const { childrenDateFormatted } = req.body

  const spreadsheetId = privatekey.absences_spreadsheet_id
  const sheetName = 'A2:H2'
  const sheets = google.sheets('v4')

  const values = childrenDateFormatted.map(child => Object.values(child))

  const body = {
    values,
  }

  sheets.spreadsheets.values.append({
    auth: jwtClient,
    spreadsheetId,
    range: sheetName,
    valueInputOption: 'RAW',
    resource: body,
  }, (err) => {
    if (err) {
      console.log(`The API returned an error: ${err}`)
    } else {
      res.send('done')
    }
  })
})

app.use(express.static(publicPath))

app.get('*', (_, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {})
