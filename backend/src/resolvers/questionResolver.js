const { Question } = require("../models/Question");
const { Answer } = require("../models/Question");

const questionResolver = {

    Query: {
        questions: async () => {
            return await Question.find().populate('answers').exec()
        },

        question: async (_, { id }) => {
            return await Question.findById(id).populate('answers').exec();
        },
    },

    Mutation: {
        createQuestion(_, { question }) {
            const newQuestion = new Question(question);
            return newQuestion.save();
        },

        createAnswer: async (_, { answer }) => {
            try {
                const newAnswer = await Answer.create(answer);
                await newAnswer.save()
                return newAnswer
            } catch (error) {
                console.error(error.message)
            }
        },

        saveAnswer: async (_, { answerId, questionId }) => {
            try{
                const question = await Question.findById(questionId);
                await question.answers.push(answerId);
                const savedQuestion = await question.save();
                return savedQuestion;
            }catch(error){
                console.error(error.message)
            }    
        },

        updateQuestion: async (_, { id, question }) => {
            const updateQuestion = await Question.findByIdAndUpdate(id, question, {
                new: true,
                useFindAndModify: false,
            });
            if (updateQuestion) {
                console.log(`Question ${id} updated.`);
            } else {
                console.log(`Question ${id} doesn't exist`);
            }
        },

        updateAnswer: async (_, { answer, answerId }) => {
            return await Answer.findByIdAndUpdate(answerId, answer, {
                new: true,
                useFindAndModify: false,
            });
        },

        deleteQuestion: async (_, { id }) => {
            const deleteQuestion = await Question.findByIdAndDelete(id);
            if (deleteQuestion) {
                console.log(`Question ${id} deleted.`);
            } else {
                console.log(`Question ${id} doesn't exist`);
            }
        },

        deleteAnswer: async (_, { id }) => {
            const deleteAnswer = await Answer.findByIdAndDelete(id);
            if (deleteAnswer) {
                console.log(`Answer ${id} deleted.`);
            } else {
                console.log(`Answer ${id} doesn't exist`);
            }
        },
    },
};

module.exports = questionResolver;