/* 
Temos aqui estruturados dois tipos de dados, 
um para as Perguntas (Question) e outro para as Respostas(Answers) 
*/

const { gql } = require("apollo-server");

const types = gql`
    type Question {
        id: ID!
        description: String
        answers: [Answer] 
    }

    type Answer {
        id: ID!
        text: String
    }
`;

module.exports = types;