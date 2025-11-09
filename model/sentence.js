import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * Schema definition for the 'Sentence' collection.
 */
const sentenceSchema = new mongoose.Schema(
  {
    sentence: {
      type: String,
      required: true,
      trim: true,
    },
    context: {
      type: String,
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Relationship to the 'User' model
      required: true,
      index: true, // Index for fast queries by user
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "SourceArticle", // Relationship to the 'SourceArticle' model
      required: true,
      index: true, // Index for fast queries by source
    },
    articleTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

/**
 * Exports the Mongoose model.
 * Mongoose will automatically create/use a collection named 'sentences'.
 */
export default mongoose.model("Sentence", sentenceSchema);
