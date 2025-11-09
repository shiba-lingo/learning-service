// We are using ES Modules, so we need to import with '.js'
import Vocabulary from '../model/vocabulary.js';
import mongoose from 'mongoose';

/**
 * @desc    Create a new vocabulary word
 * @route   POST /api/vocabularies
 * @access  Private (Requires auth)
 */
export const createVocabulary = async (req, res) => {
  try {
    // 1. Get data from the request body
    const { word, sentence, definition, articleId, articleTitle } = req.body;
    
    // 2. Get the ownerId from the authenticated user (attached by auth middleware)
    const ownerId = req.userId;

    // 3. Basic validation
    if (!word || !articleId || !articleTitle) {
      return res.status(400).json({ message: 'Missing required fields: word, articleId, articleTitle' });
    }

    // 4. Create a new vocabulary instance
    const vocabulary = new Vocabulary({
      word,
      sentence,
      definition,
      articleId,
      articleTitle,
      ownerId: ownerId, // Set the owner
    });

    // 5. Save to database
    const createdVocabulary = await vocabulary.save();
    
    // 6. Return the new vocabulary
    res.status(201).json(createdVocabulary);

  } catch (error) {
    // Handle potential errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    // Generic server error
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all vocabulary words for the logged-in user
 * @route   GET /api/vocabularies
 * @access  Private (Requires auth)
 */
export const getAllVocabularies = async (req, res) => {
  try {
    // 1. Get ownerId from the authenticated user
    const ownerId = req.userId;

    // 2. Check for query parameters (e.g., ?articleId=...)
    const { articleId } = req.query;

    // 3. Build the query object, starting with the mandatory ownerId
    const query = { ownerId: ownerId };

    // 4. If a articleId is provided in the query, add it to the filter
    if (articleId) {
      // You should validate articleId if it's supposed to be an ObjectId
      if (!mongoose.Types.ObjectId.isValid(articleId)) {
        return res.status(400).json({ message: 'Invalid articleId format' });
      }
      query.articleId = articleId;
    }

    // 5. Find all vocabularies matching the query, sorted by most recent
    const vocabularies = await Vocabulary.find(query).sort({ updated_at: -1 });

    // 6. Return the list
    res.status(200).json({ vocabularies });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get a single vocabulary word by ID
 * @route   GET /api/vocabularies/:vocabularyId
 * @access  Private (Requires auth)
 */
export const getVocabularyById = async (req, res) => {
  try {
    const { vocabularyId } = req.params;
    const ownerId = req.userId;

    // 1. Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(vocabularyId)) {
      return res.status(400).json({ message: 'Invalid Vocabulary ID' });
    }

    // 2. Find the vocabulary by its ID *AND* the owner's ID
    // This is the CRITICAL security check to prevent users from
    // accessing other users' data.
    const vocabulary = await Vocabulary.findOne({
      _id: vocabularyId,
      ownerId: ownerId,
    });

    // 3. If not found (either doesn't exist or doesn't belong to user)
    if (!vocabulary) {
      return res.status(404).json({ message: 'Vocabulary not found' });
    }

    // 4. Return the document
    res.status(200).json(vocabulary);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update a vocabulary word
 * @route   PUT /api/vocabularies/:vocabularyId
 * @access  Private (Requires auth)
 */
export const updateVocabulary = async (req, res) => {
  try {
    const { vocabularyId } = req.params;
    const ownerId = req.userId;
    
    // 1. Check for valid ID
    if (!mongoose.Types.ObjectId.isValid(vocabularyId)) {
      return res.status(400).json({ message: 'Invalid Vocabulary ID' });
    }

    // 2. Find and update the vocabulary word in one atomic operation
    // The query {_id: ..., ownerId: ...} ensures a user can ONLY update their *own* documents
    const updatedVocabulary = await Vocabulary.findOneAndUpdate(
      {
        _id: vocabularyId,
        ownerId: ownerId,
      },
      req.body, // The new data to apply (e.g., { "note": "new note" })
      {
        new: true, // Option to return the *modified* document
        runValidators: true, // Option to run schema validation on the update
      }
    );

    // 3. If no document was found to update
    if (!updatedVocabulary) {
      return res.status(404).json({ message: 'Vocabulary not found' });
    }

    // 4. Return the updated document
    res.status(200).json(updatedVocabulary);

  } catch (error) {
    // Handle errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Delete a vocabulary word
 * @route   DELETE /api/vocabularies/:vocabularyId
 * @access  Private (Requires auth)
 */
export const deleteVocabulary = async (req, res) => {
  try {
    const { vocabularyId } = req.params;
    const ownerId = req.userId;

    // 1. Check for valid ID
    if (!mongoose.Types.ObjectId.isValid(vocabularyId)) {
      return res.status(400).json({ message: 'Invalid Vocabulary ID' });
    }

    // 2. Find and delete the document
    // The query {_id: ..., ownerId: ...} ensures a user can ONLY delete their *own* documents
    const deletedVocabulary = await Vocabulary.findOneAndDelete({
      _id: vocabularyId,
      ownerId: ownerId,
    });

    // 3. If no document was found to delete
    if (!deletedVocabulary) {
      return res.status(404).json({ message: 'Vocabulary not found' });
    }

    // 4. Return a success message
    res.status(200).json({ message: 'Vocabulary deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};