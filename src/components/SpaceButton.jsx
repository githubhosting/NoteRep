import React from 'react'
import styles from './SpaceButton.module.css'

export function SpaceButton({ className = '', href, ...props }) {
  const content = (
    <button type="button" className={`${styles.btn} ${className}`} {...props}>
      <div className={styles.strong}>Live Chat 💬</div>
      <div className={styles['container-stars']}>
        <div className={styles.stars}></div>
      </div>
      <div className={styles.glow}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </button>
  );
  
  return href ? <a href={href}>{content}</a> : content;
}
