'use client'
import styles from "./page.module.css"
import Card from '../Components/Card/index'
import React, { useEffect, useState } from "react"
import { calcularEntrada, calcularSaida } from "../services/servicos"

export default function Home(){

  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [date, setDate] = useState('')
  const [tipo, setTipo] = useState('')
  const [message, setMessage] = useState('')
  const [entradas, setEntradas] = useState('')
  const [saidas, setSaidas] = useState('')
  const [total, setTotal] = useState('')

  const fetchData = async () => {
    try {const res = await fetch('http://localhost:8080/despesas/')
    const result = await res.json()

    let entrada = calcularEntrada(result)
    let saida = calcularSaida(result)
    let soma = entrada - saida

    setEntradas(entrada)
    setSaidas(saida)
    setTotal(soma)
  }catch{
    setEntradas(0)
    setSaidas(0)
    setTotal(0)
    }
  } 

  useEffect(() => {
   fetchData();
  }, []);

  const createDespesa = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:8080/despesas/',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({descricao, preco, date, tipo})
    })

    const data = await res.json()
    
    setMessage(data.message)
    setDate('')
    setDescricao('')
    setPreco('')

    await fetchData()

    setTimeout(function() {
      setMessage('')
    }, 2000)
    
  }

  return(
    <main className={styles.container}>
      <div className={styles.dash_btn}>
        <h2>
          DASHBOARD
        </h2>
      </div>
      <div className={styles.cards_container}>
        <Card 
          nome='Entradas' 
          valor={entradas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}/>
        <Card 
          nome='Saídas' 
          valor={saidas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}/>
        <Card 
          id='total'
          nome='Total' 
          valor={total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}/>
      </div>
      {message && <p className={styles.mensagemPost}>{message}</p>}
      <form className={styles.form} onSubmit={createDespesa}>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            name="descricao"
            id="descricao"
            value={descricao}
            placeholder="Insira a descrição..."
            onChange={(e) => setDescricao(e.target.value)}
            required/>
        </div>

        <div>
          <label htmlFor="preco">Valor</label>
          <input
            type="number"
            name="preco"
            id="preco"
            min='0'
            step=".01"
            value={preco}
            placeholder="Insira o valor..."
            onChange={(e) => setPreco(e.target.value)}
            required/>
        </div>

        <div>
          <label htmlFor="date">
            Data
          </label>
          <input 
            name="date" 
            type="date"
            id="date"
            min="2012-01-01"
            max="2030-12-31"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required/>
        </div>

        <div id={styles.div_radio}>
          <label>
            <input
            type="radio"
            id="entrada"
            name="tipo"
            checked={tipo === "entrada"}
            value="entrada"
            onChange={(e) => setTipo(e.target.value)}
            required/>Entrada
          </label>
  
          <label>
            <input
            type="radio"
            id="saida"
            name="tipo"
            checked={tipo === "saida"}
            value="saida"
            onChange={(e) => setTipo(e.target.value)}/>Saida
          </label>
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </main>
  )
}
