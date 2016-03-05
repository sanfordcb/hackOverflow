var Post       = require('../posts/postModel.js');
var Answer    = require('./answerModel.js');

module.exports = {

  getAnswers: function (request, response, next) {
    Answer.find({ 'post' : request.post._id }, function (err, lesAnswers) {
      if (err) {
        return response.send(err);
      }
      response.json(lesAnswers);
    });
  },

  getNumberOfAnswers: function (request, response, next) {
    Answer.find({ 'post': request.post._id },
      function (err, answers) {
        if (err) {
          return response.send(err);
        }
        response.json(answers.length);
    });
  },

  newAnswer: function (request, response, next) {
   var answer = new Answer(request.body);
   answer.post = request.post;
   answer.author = request.body.author;
   answer.body = request.body.body;
   answer.created = request.body.created;

   answer.save(function (err, answer) {
     if (err) {
       return next(err);
     }

     request.post.answers.push(answer);

     request.post.save(function(err, post) {
       if (err) {
         return next(err);
       }

       response.json(answer);
     });
   });
 },

  deleteAnswer: function (request, response, next) {
    Answer.remove({
      _id: request.params.answer
    }, function (err, post) {
      if (err) {
        return response.send(err);
      }
      response.json({ message: 'Successfully deleted' });
    });
  },

  editAnswer: function (request, response) {
    Answer.findOneAndUpdate(
      {_id: request.params.answer},
      {
        body: request.body.body,
        created: request.body.updated
      },
      {new: true},
      function(err, answer) {
        if(err) {
          return response.send(err);
        }
        response.json({message: 'Successfully updated!'});
      });
  }

};
