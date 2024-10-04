import styles from './Card.module.css'

export default function card(props){
  return(
    <div  className={styles.card}>
      <p className={styles.titulo}>{props.nome}</p>
      <p className={`${props.nome == 'Entradas' ?  styles.entrada : props.nome =='Saídas' ? styles.saida : styles.total} ${styles.bold}`}>{props.valor}</p>
    </div>
  )
}
