const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => createdAtVal.toLocaleDateString()
  }
},
{
  toJSON: {
    getters: true
  },
  id: false
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
