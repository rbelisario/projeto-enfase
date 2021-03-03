import React from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import { useParams, Link, useHistory } from "react-router-dom"
import { GET_QUESTIONS } from "./Questions"
import { GET_QUESTION_BY_ID } from "./Question"

const DELETE_QUESTION = gql`
    mutation DeleteQuestion($id: String!) {
        deleteQuestion(
            id: $id
        ){
            ok
        }
    }
`

const DeleteQuestion = () => {
    const history = useHistory()
    const { id } = useParams()

    const { loading, error, data } = useQuery(GET_QUESTION_BY_ID, {
        variables: { id },
    })

    const [deleteQuestion, { error: mutationError }] = useMutation(
        DELETE_QUESTION,
        {
            update(cache) {
                const { questions } = cache.readQuery({ query: GET_QUESTIONS })

                const deletedIndex = questions.findIndex(
                    question => question.id === id
                )

                const updatedCache = [
                ...questions.slice(0, deletedIndex),
                ...questions.slice(deletedIndex + 1, questions.length),
                ]
                
                cache.writeQuery({
                    query: GET_QUESTIONS,
                    data: {
                        questions: updatedCache,
                    },
                })
            },
            onCompleted() {
                history.push(`/`)
            },
        }
    )

    if (loading) return <p>Loading...</p>
    if (error || mutationError) return <p>Error!</p>

    return (
        <div>
            <form
                className="App-viewbox"
                onSubmit={e => {
                    e.preventDefault()

                    deleteQuestion({
                        variables: { 
                            id: data.question.id,
                        },
                    })
                }}
            >
                <p>
                    Excluir <strong>{data.question.description}</strong>?
                </p>
                <p className="App-close-btn">
                    <Link to="/">
                        <button>✖</button>
                    </Link>
                </p>
                <p>
                    <button className="App-btn" type="submit">
                        Excluir
                    </button>   
                </p>
            </form>
        </div>
    )
}

export default DeleteQuestion