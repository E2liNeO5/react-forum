import { useAppContext } from '../../../hooks/useAppContext'
import styles from './Modal.module.scss'

export function Modal() {
  const {modalOptions} = useAppContext()

  return (
    <div className={`${styles.wrapper} ${modalOptions.show ? styles.show : ''}`}>
      <div className={styles.background} />
      <div className={styles.container}>
        <h2>{modalOptions.title}</h2>
        <div className={styles.text}>{modalOptions.text}</div>
        <div className={styles.buttons}>
          <button onClick={modalOptions.ok_btn_click}>{modalOptions.ok_btn_text}</button>
          <button onClick={modalOptions.cancel_btn_click}>{modalOptions.cancel_btn_text}</button>
        </div>
      </div>
    </div>
  )
}