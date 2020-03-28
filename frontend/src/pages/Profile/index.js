import React, {useState,useEffect} from 'react'; /**useEffect serve para disparar alguma função em algum determinado momento do componente*/
import {Link,useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';

import api from '../../services/api'

import './style.css';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents,setIncidents] = useState([]); 
    /**O usestate começa com um array vazio 
     * porque como eu quero um conjunto de informações do backend,
     * preciso de um array para isso.
    */
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect( ()=>{
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, []); /**qual func vai ser executada e quando. Se o array ficar vazio ele só vai executar uma vez no fluxo do componente*/

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });
        /**Varrendo os incidentes */
         /**E vamos usar um filtro   */
        setIncidents(incidents.filter(incident => incident.id !== id));
       
        } catch (err) {
          alert('Erro ao deletar o caso, tente novamente.');  
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt= "Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className = "button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button" >
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(incident.value)}</p>

                            <button onClick={()=>handleDeleteIncident(incident.id)} type = "button">
                                <FiTrash2 size={20} color ="#a8a8b3"/>
                            </button>
                    </li>
                ))} 
            </ul>


        </div>
    );
}