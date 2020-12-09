import React from 'react';

import styles from './comp-b.module.css';

// React.Fragment or just <></> eliminates the need to use a DIV just for wrapping
export const CompB = props => (
  <>
    <h3 className={styles.title}>Component B</h3>
    <button className={styles.button}> ... </button>
  </>
);