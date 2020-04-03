import React, { useState, useEffect, useContext } from 'react'
import AppContext from '../utils/AppContext'
import { globalHistory } from '@reach/router'

import PageHeader from '../components/PageHeader'
import DownloadEosIcons from '../components/DownloadEosIcons'
import IconsSet from '../modules/IconsSet'

const Cheatsheet = () => {
  const [header, setHeader] = useState(true)
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    return globalHistory.listen(() =>
      state.customize ? dispatch({ type: 'TOGGLE_CUSTOMIZE' }) : ''
    )
  }, [state.customize, dispatch])

  const manageHeader = () => {
    setHeader(!header)
  }

  const search = (file, dispatch) => {
    const fileReader = new window.FileReader()

    fileReader.onload = function (fileData) {
      const iconsArray = JSON.parse(fileData.target.result)

      return dispatch({
        type: 'UPLOAD_PREVIOUS_SELECTION',
        data: iconsArray.extended_icons
      })
    }

    return fileReader.readAsText(file)
  }

  return (
    <AppContext.Consumer>
      {({ state, dispatch }) => (
        <div>
          {header ? (
            <PageHeader theme='purple'>
              <h2>
                Cheatsheet: find the ligature of the icon you are looking for,
                plus, get an overview of all the available icons.
              </h2>
            </PageHeader>
          ) : (
            <PageHeader theme='purple'>
              <div>
                <h2>Click on Icons to select them</h2>
                <p>
                  To continue building an old font, upload icons-config.json
                </p>
                <label className='btn btn-default upload' htmlFor='upload-file'>
                  <i className='eos-icons md-18'>cloud_upload</i>
                  Upload JSON
                </label>
                <input
                  type='file'
                  id='upload-file'
                  hidden
                  name='file'
                  onChange={event => search(event.target.files[0], dispatch)}
                />
              </div>
            </PageHeader>
          )}
          <DownloadEosIcons />
          <IconsSet action={manageHeader} />
        </div>
      )}
    </AppContext.Consumer>
  )
}

export default Cheatsheet
