import React from 'react'
import Map from '../Map'

import styles from './style.module.scss'

const Place = ({ name, date, note, point }) => (
  <div className={styles.container}>
    <h1 className='display-4 text-truncate'>
      {name}
    </h1>
    <h6>
      {date}

      <a
        className='btn btn-primary btn-sm'
        href={window.location.pathname.concat('/edit')}
      >
        Edit
      </a>
    </h6>

    <hr />

    <div className='row'>
      <div className={`${styles.note} trix-content col-md-6 col-sm-12`}>
        {note || <p className='text-secondary font-weight-light font-italic'>
              No note yet.
        </p>
        }
      </div>
      {point &&
        <div className='col-md-6 col-sm-12'>
          <Map className={styles.map} points={[point]} center={point} zoom={15} />
        </div>
      }
    </div>
  </div>
)

export default Place
