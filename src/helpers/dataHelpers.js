import axios from 'axios'

const storeLastUpdated = () => {
  if (process.env.NODE_ENV !== 'development') {
    return axios
      .get('/api/allLastModified')
      .then((response) => {
        localStorage.setItem('dates', JSON.stringify(response.data))
        return response
      })
  }
}

export const hasFileBeenModified = (savedData, spreadsheetId) => {
  const allLastModified = JSON.parse(localStorage.getItem('dates'))

  if (allLastModified === null) {
    storeLastUpdated().then((res) => {
      const newTimeObj = res.data.filter(file => file.id === spreadsheetId)[0]
      const newTime = newTimeObj.modifiedTime
      const oldTime = savedData[0].modifiedTime

      return newTime !== oldTime
    })
  } else {
    const newTimeObj = allLastModified.filter(file => file.id === spreadsheetId)[0]
    const newTime = newTimeObj.modifiedTime
    const oldTime = savedData[0].modifiedTime

    return newTime !== oldTime
  }
}

export const backendGetData = spreadsheetId => axios
  .get('/api/getFieldData', {
    params: {
      spreadsheetId,
    },
  })
  .then((res) => {
    const serializedData = JSON.stringify(res.data)
    localStorage.setItem(spreadsheetId, serializedData)
    return res.data
  })

export const getData = (spreadsheetId) => {
  const savedData = JSON.parse(localStorage.getItem(spreadsheetId))

  if (!savedData) {
    const backendGetDataResult = backendGetData(spreadsheetId)
    return backendGetDataResult.then(fetchedData => fetchedData.slice(1))
  }

  if (savedData && process.env.NODE_ENV !== 'development' && hasFileBeenModified(savedData, spreadsheetId)) {
    return backendGetData(spreadsheetId).then(fetchedData => fetchedData.slice(1))
  }

  return new Promise((resolve) => {
    resolve(savedData.slice(1))
  })
}
