export default function formatarData(data){
  const dataObj = new Date(data)
  const dia = String(dataObj.getDate()).padStart(2, '0')
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0')
  const ano = dataObj.getFullYear()
  return `${dia}/${mes}/${ano}`
}

export function calcularEntrada(dados){
  let soma = 0
  dados.map((item)=> item.tipo == 'entrada' ? soma += Number(item.preco) : soma + 0)
  return soma
}

export function calcularSaida(dados){
  let soma = 0
  dados.map((item)=> item.tipo == 'saida' ? soma += Number(item.preco) : soma + 0)
  return soma
}

export async function deletarItem(id, descricao, preco){
  console.log(preco)
  let confirma = confirm(`Deseja excluir o item: 
ID: ${id}, ${descricao} no valor de ${Number(preco).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`)
  if(confirma){
    try {
      const res = await fetch(`http://localhost:8080/despesas/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao deletar o item');
      }

      alert(data.message); // Exibe a mensagem de sucesso
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message); // Exibe a mensagem de erro
    }
  }
}

export async function atualizarItem(id, updatedItem){
  try {
    const res = await fetch(`http://localhost:8080/despesas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })

    const data = await res.json()

    if (res.ok) {
      alert(data.message)
    } else {
      console.error('Erro ao atualizar o item:', res.statusText)
    }
  } catch (error) {
    console.error('Erro ao atualizar o item:', error)
  }
}