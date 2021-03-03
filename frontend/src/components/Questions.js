import React from "react"
import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

export const GET_QUESTIONS = gql`
    {
        questions {
            id
            description
        }
    }
`

const QuestionsList = () => {

const { loading, error, data } = useQuery(GET_QUESTIONS)
if (loading) return <p>Loading...</p>
if (error) return <p>Error!</p>

    return (
        <>
            <ul>
                {data.questions &&
                    data.questions.map(({ id, description }) => (
                        <li key={id}>
                            <span>{description}</span>
                            <div className="App-item-actions">
                                <Link to={`/question/${id}`}>
                                    <span role="img" aria-label="visualizar">
                                    👀
                                    </span>
                                </Link>
                                <Link to={`/editQuestion/${id}`}>
                                    <span role="img" aria-label="editar">
                                        ✏️
                                    </span>         
                                </Link>
                                <Link to={`/deleteQuestion/${id}`}>
                                    <span role="img" aria-label="excluir">
                                        ❌
                                    </span>
                                </Link>
                            </div>
                        </li>
                    ))
                }
            </ul>

            <p>
                <Link to="/createQuestion">
                    <button>Nova Pergunta</button>
                </Link>
            </p>
        </>
    )
}

export default QuestionsList