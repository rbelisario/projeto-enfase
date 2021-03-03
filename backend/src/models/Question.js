const mongoose = require("mongoose");

const Schema = mongoose.Schema //Acessar o método de Schema

const answerSchema = Schema({
    creator: { 
        type: Schema.Types.ObjectId, ref: 'Question' 
    },
    text: String,
});

const QuestionSchema = Schema({
        description: {
            type: String,
            required: true,
        },
        answers : [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

Question = mongoose.model("Question", QuestionSchema);
Answer = mongoose.model("Answer", answerSchema);

module.exports = {
    Question: Question,
    Answer: Answer
}
