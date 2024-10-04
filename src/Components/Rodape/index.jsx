import styles from './Rodape.module.css'

export default function Rodape(){
  return(
    <footer className={styles.rodape}>
      <p>Copyright 2024 ©️ <a href="https://github.com/tiagoh671" target='_blank' className='link'>tiagoh671</a></p>
    </footer>
  )
}