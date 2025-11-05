import Sentence from '../model/sentence.js';
import mongoose from 'mongoose';

/**
 * @desc    Create a new sentence
 * @route   POST /api/sentences
 * @access  Private (Requires auth)
 */
export const createSentence = async (req, res) => {
  try {
    // 1. Get data from the request body
    const { sentence, note, sourceId, sourceTitle } = req.body;
    
    // 2. Get the ownerId from the authenticated user
    const ownerId = req.userId;

    // 3. Basic validation
    if (!sentence || !sourceId || !sourceTitle) {
      return res.status(400).json({ message: 'Missing required fields: sentence, sourceId, sourceTitle' });
    }

    // 4. Create a new sentence instance
    const newSentence = new Sentence({
      sentence,
      note,
      sourceId,
      sourceTitle,
      ownerId: ownerId, // Set the owner
    });

    // 5. Save to database
    const createdSentence = await newSentence.save();
    
    // 6. Return the new sentence
    res.status(201).json(createdSentence);

  } catch (error) {
    // Handle potential errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all sentences for the logged-in user
 * @route   GET /api/sentences
 * @access  Private (Requires auth)
 */
export const getAllSentences = async (req, res) => {
  try {
    // 1. Get ownerId from the authenticated user
    const ownerId = req.userId;

    // 2. Check for query parameters
    const { sourceId } = req.query;

    // 3. Build the query object
    const query = { ownerId: ownerId };

    // 4. Add sourceId to filter if provided
    if (sourceId) {
      if (!mongoose.Types.ObjectId.isValid(sourceId)) {
        return res.status(400).json({ message: 'Invalid sourceId format' });
      }
      query.sourceId = sourceId;
    }

    // 5. Find all sentences matching the query
    const sentences = await Sentence.find(query).sort({ updated_at: -1 });

    // 6. Return the list
    res.status(200).json({ sentences });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get a single sentence by ID
 * @route   GET /api/sentences/:sentenceId
 * @access  Private (Requires auth)
 */
export const getSentenceById = async (req, res) => {
  try {
    const { sentenceId } = req.params;
    const ownerId = req.userId;

    // 1. Check for valid ID
    if (!mongoose.Types.ObjectId.isValid(sentenceId)) {
      return res.status(400).json({ message: 'Invalid Sentence ID' });
    }

    // 2. Find the sentence by its ID *AND* the owner's ID (Security)
    const sentence = await Sentence.findOne({
      _id: sentenceId,
      ownerId: ownerId,
    });

    // 3. If not found
    if (!sentence) {
      return res.status(404).json({ message: 'Sentence not found' });
    }

    // 4. Return the document
    res.status(200).json(sentence);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update a sentence
 * @route   PUT /api/sentences/:sentenceId
 * @access  Private (Requires auth)
 */
export const updateSentence = async (req, res) => {
  try {
    const { sentenceId } = req.params;
    const ownerId = req.userId;
    
    // 1. Check for valid ID
    if (!mongoose.Types.ObjectId.isValid(sentenceId)) {
      return res.status(400).json({ message: 'Invalid Sentence ID' });
    }

    // 2. Find and update the sentence (and ensure it belongs to the user)
    const updatedSentence = await Sentence.findOneAndUpdate(
      {
        _id: sentenceId,
        ownerId: ownerId,
      },
      req.body, // The new data
      {
        new: true, // Return the modified document
        runValidators: true,
      }
    );

    // 3. If no document was found to update
    if (!updatedSentence) {
      return res.status(404).json({ message: 'Sentence not found' });
    }

    // 4. Return the updated document
    res.status(200).json(updatedSentence);

  } catch (error) {
    // Handle errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Delete a sentence
 * @route   DELETE /api/sentences/:sentenceId
 * @access  Private (Requires auth)
 */
export const deleteSentence = async (req, res) => {
  try {
    const { sentenceId } = req.params;
    const ownerId = req.userId;

    // 1. Check for valid ID
    if (!mongoose.Types.ObjectId.isValid(sentenceId)) {
      return res.status(400).json({ message: 'Invalid Sentence ID' });
    }

    // 2. Find and delete the document (ensuring it belongs to the user)
    const deletedSentence = await Sentence.findOneAndDelete({
      _id: sentenceId,
      ownerId: ownerId,
    });

    // 3. If no document was found to delete
    if (!deletedSentence) {
      return res.status(404).json({ message: 'Sentence not found' });
    }

    // 4. Return a success message
    res.status(200).json({ message: 'Sentence deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};