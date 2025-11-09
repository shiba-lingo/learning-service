import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * Schema definition for the 'Vocabulary' collection.
 * This defines the structure, data types, and validation rules.
 */
const vocabularySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true, // Automatically remove whitespace from start/end
    },
    definition: {
      type: String,
      trim: true,
    },
    sentence: {
      type: String,
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Key: This creates a relationship to the 'User' model
      required: true,
      index: true, // Key: Creates an index for fast lookups by ownerId
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "SourceArticle", // Key: Creates a relationship to your 'SourceArticle' model
      required: true,
      index: true, // Key: Creates an index for fast filtering by articleId
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
 * The check 'mongoose.models.Vocabulary' prevents redefining the model
 * in hot-reloading environments (like Next.js).
 * Mongoose will automatically create/use a collection named 'vocabularies'.
 */

export default mongoose.model("Vocabulary", vocabularySchema);