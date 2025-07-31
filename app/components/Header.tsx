import React from 'react';
import styles from './Header.module.css';
import Search from './Search';

const Header = () => {
  return (
    <header 
      className={styles.header}>
      <Search placeholder = "Sök"/>
    </header>
  )
}

export default Header
