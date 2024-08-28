import styles from './Header.module.scss'
import { useAppContext } from '../../../hooks/useAppContext'
import { Link, useHref } from 'react-router-dom'
import { useGetLinks } from '../../../hooks/useGetLinks'

export function Header() {
  const { currentUser, currentLink, setCurrentLink } = useAppContext()
  const links = useGetLinks(currentUser)
  const href = useHref()
  
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        Forum
        <span></span>
      </div>

      <div className={styles.menu}>
        { links.map((link, index) => {
          if(link.btn) {
            return (<span
              className={`${styles.link} ${href === link.to ? styles.active : ''}`}
              key={index}
              onClick={link.onClick}
            >{link.name}</span>)
          } else {
            return (
              <Link
                to={link.to}
                className={`${styles.link} ${href === link.to ? styles.active : ''}`}
                key={index}
                onClick={() => setCurrentLink(link.to)}
              >{link.name}</Link>
            )
          }
        }) }
      </div>
    </div>
  )
}