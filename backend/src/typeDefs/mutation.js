/* 
Temos aqui estruturadas as mutations
- Os inputs servem permitem passar objetos como argumentos para as queries e mutations
*/

const { gql } = require("apollo-server");

const mutation = gql`
    type Mutation {
        createQuestion(question: QuestionInput): Question
        deleteQuestion(id: String): DeleteResponse
        updateQuestion(id: String, question: QuestionInput): Question
        updateAnswer(answer: AnswerInput, answerId: ID!): Answer
        createAnswer(answer: AnswerInput): Answer
        deleteAnswer(id: ID!): Answer
        saveAnswer(answerId: String, questionId: ID): Question
        saveDeletedAnswer(answerId: String, questionId: ID): Question
    }

    input QuestionInput {
        description: String!
        answers: [ID]
    }

    input AnswerInput {
        text: String!
    }

    type DeleteResponse {
        ok: Boolean!
    }
`;

module.exports = mutation;