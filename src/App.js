import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      title: `Desafio React.js ${Date.now()}`,
      url: "https://github.com/ligiaas/concepts-reactjs",
      techs: ['React', 'Reactjs', 'babel', 'webpack', 'axios']
    }

    const res = await api.post('repositories', newRepository)

    if (res.status === 200) {
      const repository = res.data
      setRepositories([...repositories, repository])
    }

    console.log(10 + 2 + 1 + "10")
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`)

    if (res.status === 204) {
      const newRepositories = repositories.filter(item => item.id !== id)
      setRepositories(newRepositories)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(item => (
            <li key={item.id}>
              <span>{item.title}</span>
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      <span>ligia de almeida</span>
    </div>
  );
}

export default App;
