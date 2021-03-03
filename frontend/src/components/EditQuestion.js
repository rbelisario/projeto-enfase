/* 
- Aqui usamos o parâmetro vindo da rota para identificar o id da pergunta e depois redirecionamos para o caminho "/"
- Usamos a query GET_QUESTION_BY_ID para buscar a pergunta 
*/


import React from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import { useParams, Link, useHistory } from "react-router-dom"
import { GET_QUESTION_BY_ID } from "./Question"

const UPDATE_QUESTION = gql`
    mutation UpdateQuestion($id: String!, $description: String){
        updateQuestion(
            id: $id
            question: {
                description: $description
            }
        ){
            id
            description
        }
    }
`;

const EditQuestion = () => {
    const { id } = useParams();
    const history = useHistory();

    const { loading, error, data } = useQuery(GET_QUESTION_BY_ID, {
        variables: { id },
    });

    const [updateQuestion, { error: mutationError }] = useMutation(
        UPDATE_QUESTION,
        {
            onCompleted() {
                history.push(`/`)
            },
        }
    );

    if (loading) return <p>Loading...</p>
    if (error || mutationError) return <p>Error!</p>

    let descriptionInput;

    return (
        <div>
            <form
                className="App-viewbox"
                onSubmit={e => {
                    e.preventDefault();

                    updateQuestion({
                        variables: {
                            id: data.question.id,
                            description: descriptionInput.value,
                        },
                    });
                }}
            >
                <p>
                    <label>
                        Pergunta
                        <br />
                        <input
                            type="text"
                            name="description"
                            defaultValue={data.question.description}
                            ref={node => {
                                descriptionInput = node
                            }}
                        />
                    </label>
                </p>
                <p className="App-close-btn">
                    <Link to="/">
                        <button type="button">✖</button>
                    </Link>
                </p>
                <p>
                    <button className="App-btn" type="submit">
                        Salvar
                    </button>
                </p>
            </form>
        </div>
    );
};

export default EditQuestion;