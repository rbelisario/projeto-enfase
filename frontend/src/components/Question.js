import React from "react"
import { gql, useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom"

export const GET_QUESTION_BY_ID = gql`
    query GetQuestion($id: ID!) {
        question(id: $id) {
            id
            description
            answers {
                text
            }
        }
    }
`

const Question = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_QUESTION_BY_ID, {
        variables: { id },
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    return (
        <div className="App-viewbox">
            <p>
                <strong>Pergunta: </strong>
                {data.question.description}
                <Link to={`/editQuestion/${id}`}>
                <button>Editar</button>
                </Link>
            </p>
            <div>
                {data.question.answers.map((answer) => {
                    return (
                        <div>
                            <li key={ answer.id }>
                                <input type="radio" name="questao" value={ answer.text } key={ answer.id } /> 
                                {answer.text}
                                <div className="App-item-actions">
                                    <Link to={`/editAnswer/${answer.id}`}>
                                        <span role="img" aria-label="editar">
                                            ✏️
                                        </span>         
                                    </Link>
                                    <Link to={`/deleteAnswer/${answer.id}`}>
                                        <span role="img" aria-label="excluir">
                                            ❌
                                        </span>
                                    </Link>
                                </div>
                            </li>
                        </div>
                    );
                })}
            </div>
            <p className="App-close-btn">
                <Link to="/">
                <button>✖</button>
                </Link>
            </p>
            <p>
                <Link to="/createAnswer">
                    <button>Nova Resposta</button>
                </Link>
            </p>
        </div>
    )
}

export default Question