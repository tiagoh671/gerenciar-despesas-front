import Image from "next/image"
import icone from '../../../Public/Assets/icone.jpg'
import Link from "next/link"
import styles from './Topo.module.css'

export default function Topo(){
  return(
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>GERENCIADOR DE DESPESAS</h1>
        <nav className={styles.nav}>
          <Link href='/' className={styles.link}>Início</Link>
          <Link href='/historico' className={styles.link}>Histórico</Link>
        </nav>
    </div>
    </header>
  )
}