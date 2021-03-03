import React from "react"
import { gql, useMutation } from "@apollo/client"
import { Link, useHistory } from "react-router-dom"
import { GET_QUESTIONS } from "./Questions"

const CREATE_QUESTION = gql`
    mutation CreateQuestion($description: String!) {
        createQuestion(
            question: {
                description: $description
            }
        ) {
            id
            description
        }
    }
`

const CreateQuestion = () => {
    const history = useHistory()

    const [createQuestion, { loading, error }] = useMutation(
        CREATE_QUESTION,
        {
            update(cache, { data: { createQuestion } }) {
                const { questions } = cache.readQuery({ query: GET_QUESTIONS })
                cache.writeQuery({
                query: GET_QUESTIONS,
                data: { questions: questions.concat([createQuestion]) },
                })
            },
            onCompleted() {
                history.push(`/`)
            },
        }
    )

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    let descriptionInput

    return (
        <div>
            <form
                className="App-viewbox"
                onSubmit={e => {
                    e.preventDefault()

                    createQuestion({
                        variables: {
                        description: descriptionInput.value,
                        },
                    })

                    descriptionInput.value = ""
                }}
            >
                <p>
                <label>
                    Pergunta
                    <br />
                    <input
                        type="text"
                        name="description"
                        ref={node => {
                            descriptionInput = node
                        }}
                    />
                </label>
                </p>

                <p className="App-close-btn">
                    <Link to="/">
                        <button>✖</button>
                    </Link>
                </p>
                <p>
                    <button className="App-btn" type="submit">
                        Salvar
                    </button>
                </p>
            </form>
        </div>
    )
}
    
export default CreateQuestion