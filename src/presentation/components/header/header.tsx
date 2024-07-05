import React, { memo } from 'react'
import * as Styles from './header-styles.scss'
import { currentAccountState, Logo } from '@/presentation/components'
import { useLogout } from '@/presentation/hooks'
import { useRecoilValue } from 'recoil'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount()?.name}</span>
          <a data-testid="logout" href="#" onClick={handleLogout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
