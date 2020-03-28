import React, {useState} from 'react';
import './global.css'

import Routes from './routes'

function App() {
  /**
  const [counter,setCounter] = useState(0);
   * useState  retorna um ARRAY:
   * Primeira pos: Valor da variavel
   * Segunda pos: Função de atualização do valor
   * Não se pode manipular diretamente a variavel de estado (questões de desempenho)
 
  function increment(){
    setCounter(counter+1);
  */
  return (
    <Routes/>
  );
}

export default App;
