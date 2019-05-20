const path = require('path')
const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const { google } = require('googleapis')
const bodyParser = require('body-parser')
const logger = require('morgan')
// const privatekey = require('./sheets.json')
require('dotenv').config()

const port = process.env.PORT || 3000
const app = express()
app.use(cors())

const publicPath = path.join(__dirname, 'public')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

// const jwtClient = new google.auth.JWT(privatekey.client_email,
//   null,
//   privatekey.private_key, [
//     'https://www.googleapis.com/auth/spreadsheets',
//     'https://www.googleapis.com/auth/drive',
//   ])

const jwtClient = new google.auth.JWT(process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
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

app.get('/api/allLastModified', (req, res) => {
  const drive = google.drive('v3')

  drive.files
    .list({
      auth: jwtClient,
      fields: 'files(modifiedTime, name, id)',
    })
    .then((response) => {
      const dataSendBack = response.data.files
      res.send(dataSendBack)
    })
})

app.get('/api/getFieldData', (req, res) => {
  const sheets = google.sheets('v4').spreadsheets.values
  const drive = google.drive('v3')
  const { spreadsheetId } = req.query

  sheets
    .get({
      auth: jwtClient,
      spreadsheetId,
      range: 'A:C',
    })
    .then((response) => {
      const sheetsData = response.data.values
      const savableForm = []

      if (sheetsData) {
        const keys = sheetsData[0]

        for (let row = 1; row < sheetsData.length; row++) {
          const obj = {}

          for (let propIndex = 0; propIndex < sheetsData[row].length; propIndex++) {
            const currRow = sheetsData[row]
            const currProp = keys[propIndex]

            obj[currProp] = currRow[propIndex]
          }

          savableForm.push(obj)
        }
      }

      drive.files
        .list({
          auth: jwtClient,
          fileId: spreadsheetId,
          fields: 'files(modifiedTime, name, id)',
        })
        .then((responseDrive, errDrive) => {
          if (!errDrive) {
            const file = responseDrive.data.files.filter(row => row.id === spreadsheetId)
            const { modifiedTime } = file[0]

            savableForm.unshift({
              modifiedTime,
            })

            res.send(savableForm)
          }
        })
    })
})

app.post('/api/getList', (req, res) => {
  const { childrenDateFormatted } = req.body
  const sheets = google.sheets('v4').spreadsheets.values

  const values = childrenDateFormatted.map(child => Object.values(child))
  const body = {
    values,
  }

  sheets.append({
    auth: jwtClient,
    spreadsheetId: process.env.ABSENCES_SHEET,
    // spreadsheetId: privatekey.absences_spreadsheet_id,
    range: 'A2:H2',
    valueInputOption: 'RAW',
    resource: body,
  }, (err) => {
    if (!err) {
      res.send('done')
    }
  })
})

app.use(express.static(publicPath))
// app.use('/.netlify/functions/api')

app.get('*', (_, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {})

// module.exports.handler = serverless(app)
