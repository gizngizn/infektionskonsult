import React from 'react';
import styles from './Header.module.css';
import Search from './Search';
import { Suspense } from "react"

const Header = () => {
  return (
    <header 
      className={styles.header}>
      <Suspense> 
        <Search placeholder = "Sök"/>
      </Suspense> 
    </header>
  )
}

export default Header
