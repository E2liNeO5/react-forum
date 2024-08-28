import styles from './DividingLine.module.scss'

export function DividingLine({width}) {
  return <div className={styles.dividing_line} style={{ width: width || '100%' }} />
}