import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState(''); // pega o valor do email em tempo real

    async function handleSubmit(event) {
        event.preventDefault(); // nao faz o funcionamento padrao

        const response = await api.post('/sessions', { email });

        const { _id } = response.data; // pega o id

        //localStorage = banco de dados do navegador
        localStorage.setItem('user', _id);

        history.push('/dashboard'); //vai para a pagina dashboard
    }

    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}
