import { X } from 'lucide-react'
import styles from './Hint.module.scss'
import { useEffect } from 'react'
import { useAppContext } from '../../../hooks/useAppContext'

export function Hint() {
  const {hintOptions} = useAppContext()

  useEffect(() => {
    if(hintOptions.show)
      setTimeout(hintOptions.onClose, 5000)
  }, [hintOptions.show])

  return (
    <div className={`${styles.container} ${styles[hintOptions.type]} ${hintOptions.show ? styles.show : ''}`}>
      <X
        className={styles.close}
        size={16}
        onClick={hintOptions.onClose}
      />
      {hintOptions.text}
    </div>
  )
}