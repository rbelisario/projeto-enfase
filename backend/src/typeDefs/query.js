/* 
Temos aqui estruturadas as queries
- questions: retorna um array com dados do tipo Question
- question: tem como parâmetro o id da pergunta e retorna um item do tipo Question
*/

const { gql } = require("apollo-server");

const query = gql`
    type Query {
        questions: [Question!]
        question(id: ID!): Question!
    }
`;

module.exports = query;