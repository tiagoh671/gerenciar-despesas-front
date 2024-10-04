'use client'
import styles from './historico.module.css'
import React, { useEffect, useState } from 'react'
import formatarData, { atualizarItem, deletarItem } from '../../services/servicos.js'

export default function historico(){

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  
  const fetchData = async () => {
    const res = await fetch('http://localhost:8080/despesas/')
    const result = await res.json()
    setData(result)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchData()
  }, []);

  const handleDelete = async (id, descricao, preco) => {
    try {
      await deletarItem(id, descricao, preco)
      await fetchData()
    } catch (error) {
      console.error('Erro ao deletar o item:', error)
    }
  }

  const handleUpdate = async (id, updatedItem) => {
    try {
      await atualizarItem(id, updatedItem)
      await fetchData()
      setEditingItem(null)
    } catch (error) {
      console.error('Erro ao atualizar o item:', error)
    }
  }
  
  const handleEditClick = (item) => {
    setEditingItem(item.id) 
  }
  
  const handleSaveClick = (item) => {
    const updatedItem = {
      descricao: item.descricao,
      preco: item.preco,
      tipo: item.tipo,
    }
    handleUpdate(item.id, updatedItem)
  }

  if (loading) {
    return <p className={styles.carregando}>Carregando...</p>
  }

  return(
    <main className={styles.container}>
      <h2>HISTÓRICO</h2>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className={styles.bold}>{item.id}</td>
                  <td>
                    {editingItem === item.id ? (
                      <input
                        type="text"
                        value={item.descricao}
                        onChange={(e) =>
                          setData((prevData) =>
                          prevData.map((d) =>
                          d.id === item.id
                          ? { ...d, descricao: e.target.value }
                          : d))}/>) : 
                          (item.descricao)}
                  </td>
                  <td className={styles.bold}>
                    {editingItem === item.id ? (
                      <input
                        type="number"
                        value={item.preco}
                        onChange={(e) =>
                          setData((prevData) =>
                          prevData.map((d) =>
                          d.id === item.id
                          ? { ...d, preco: e.target.value }
                          : d))}/>) : 
                          (Number(item.preco).toLocaleString('pt-br', {style: 'currency',currency: 'BRL',}))}
                  </td>
                  <td>{formatarData(item.date)}</td>
                  <td>
                    {editingItem === item.id ? (
                      <select
                        value={item.tipo}
                        onChange={(e) =>
                          setData((prevData) =>
                          prevData.map((d) =>
                          d.id === item.id
                          ? { ...d, tipo: e.target.value }
                          : d))}>
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                      </select>) 
                      : (<span
                        className={`${item.tipo === 'saida' ? styles.saida : styles.entrada} ${styles.bold}`}
                      >
                        {item.tipo.toUpperCase()}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingItem === item.id ? (
                      <button
                        onClick={() => handleSaveClick(item)}
                        className={`${styles.btn_salvar} ${styles.btn}`}
                      >Salvar</button>
                    ) : (
                      <button onClick={() => handleEditClick(item)}
                        className={`${styles.btn_alterar} ${styles.btn}`}
                      >Alterar</button>
                    )}
                    <button onClick={() => handleDelete(item.id, item.descricao, item.preco)}
                      className={`${styles.btn_excluir} ${styles.btn}`}
                    >Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.zerado}>
                  Nenhum dado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}