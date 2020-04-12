import React from 'react'
import Paper from '@material-ui/core/Paper'

import Map from '../Map'
import styles from './style.module.scss'

const Place = ({ name, date, note, point }) => (
  <>
    <div className={styles.container}>
      {point &&
        <div style={{ flexGrow: 2 }}>
          <Map points={[point]} center={point} zoom={15} />
        </div>}
    </div>
    <Paper className={styles.content}>
      <h1>
        {name}
      </h1>
      <h6>
        {date}

        <a
          href={window.location.pathname.concat('/edit')}
        >
          Edit
        </a>
      </h6>

      <hr />

      <div>
        <div className='trix-content'>
          {note || <p> No note yet. </p>}
        </div>
      </div>
    </Paper>
  </>
)

export default Place
