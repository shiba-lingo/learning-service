import express from 'express';
import * as vocabularyController from "./controllers/vocabularyController.js";
import * as sentenceController from "./controllers/sentenceController.js";
import authMiddleware from './middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Vocabulary
 *     description: API for managing vocabularies
 *   - name: Sentence
 *     description: API for managing example sentences
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Vocabulary:
 *       type: object
 *       required:
 *         - word
 *         - source_id
 *         - source_title
 *         - owner_id
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the vocabulary
 *         word:
 *           type: string
 *           description: The vocabulary word
 *           example: "serendipity"
 *         sentence:
 *           type: string
 *           description: Example sentence using the vocabulary (optional)
 *           example: "Meeting her by chance was pure serendipity."
 *         definition:
 *           type: string
 *           description: Definition or meaning of the word (optional)
 *           example: "The occurrence of events by chance in a happy or beneficial way."
 *         source_id:
 *           type: string
 *           description: Identifier of the source where this vocabulary was found
 *           example: "article_12345"
 *         source_title:
 *           type: string
 *           description: Title of the source document or content
 *           example: "The Science of Happy Accidents"
 *         owner_id:
 *           type: string
 *           description: ID of the user who owns this vocabulary
 *           example: "654a1bc23f78de45c90123f4"
 *
 *     Sentence:
 *       type: object
 *       required:
 *         - sentence
 *         - source_id
 *         - source_title
 *         - owner_id
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the sentence
 *         sentence:
 *           type: string
 *           description: The sentence text
 *           example: "Knowledge is power."
 *         context:
 *           type: string
 *           description: Additional context or background for the sentence (optional)
 *           example: "Said by Francis Bacon in a philosophical essay."
 *         source_id:
 *           type: string
 *           description: Identifier of the source where this sentence was found
 *           example: "book_98765"
 *         source_title:
 *           type: string
 *           description: Title of the source document or article
 *           example: "The Essays of Francis Bacon"
 *         owner_id:
 *           type: string
 *           description: ID of the user who owns this sentence
 *           example: "654a1bc23f78de45c90123f4"
 */

// ======================= Vocabulary Routes =======================

/**
 * @swagger
 * /vocabularies:
 *   post:
 *     summary: Create a new vocabulary
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vocabulary'
 *     responses:
 *       201:
 *         description: Vocabulary created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/vocabularies', authMiddleware, vocabularyController.createVocabulary);

/**
 * @swagger
 * /vocabularies:
 *   get:
 *     summary: Get all vocabularies
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all vocabularies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vocabulary'
 *       401:
 *         description: Unauthorized
 */
router.get('/vocabularies', authMiddleware, vocabularyController.getAllVocabularies);

/**
 * @swagger
 * /vocabularies/{vocabularyId}:
 *   get:
 *     summary: Get a vocabulary by ID
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vocabularyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Vocabulary ID
 *     responses:
 *       200:
 *         description: Vocabulary found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vocabulary'
 *       404:
 *         description: Vocabulary not found
 *       401:
 *         description: Unauthorized
 */
router.get('/vocabularies/:vocabularyId', authMiddleware, vocabularyController.getVocabularyById);

/**
 * @swagger
 * /vocabularies/{vocabularyId}:
 *   put:
 *     summary: Update a vocabulary
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vocabularyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Vocabulary ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vocabulary'
 *     responses:
 *       200:
 *         description: Vocabulary updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Vocabulary not found
 *       401:
 *         description: Unauthorized
 */
router.put('/vocabularies/:vocabularyId', authMiddleware, vocabularyController.updateVocabulary);

/**
 * @swagger
 * /vocabularies/{vocabularyId}:
 *   delete:
 *     summary: Delete a vocabulary
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vocabularyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Vocabulary ID
 *     responses:
 *       200:
 *         description: Vocabulary deleted successfully
 *       404:
 *         description: Vocabulary not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/vocabularies/:vocabularyId', authMiddleware, vocabularyController.deleteVocabulary);

// ======================= Sentence Routes =======================

/**
 * @swagger
 * /sentences:
 *   post:
 *     summary: Create a new sentence
 *     tags: [Sentence]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sentence'
 *     responses:
 *       201:
 *         description: Sentence created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/sentences', authMiddleware, sentenceController.createSentence);

/**
 * @swagger
 * /sentences:
 *   get:
 *     summary: Get all sentences
 *     tags: [Sentence]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all sentences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sentence'
 *       401:
 *         description: Unauthorized
 */
router.get('/sentences', authMiddleware, sentenceController.getAllSentences);

/**
 * @swagger
 * /sentences/{sentenceId}:
 *   get:
 *     summary: Get a sentence by ID
 *     tags: [Sentence]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sentenceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Sentence ID
 *     responses:
 *       200:
 *         description: Sentence found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sentence'
 *       404:
 *         description: Sentence not found
 *       401:
 *         description: Unauthorized
 */
router.get('/sentences/:sentenceId', authMiddleware, sentenceController.getSentenceById);

/**
 * @swagger
 * /sentences/{sentenceId}:
 *   put:
 *     summary: Update a sentence
 *     tags: [Sentence]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sentenceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Sentence ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sentence'
 *     responses:
 *       200:
 *         description: Sentence updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Sentence not found
 *       401:
 *         description: Unauthorized
 */
router.put('/sentences/:sentenceId', authMiddleware, sentenceController.updateSentence);

/**
 * @swagger
 * /sentences/{sentenceId}:
 *   delete:
 *     summary: Delete a sentence
 *     tags: [Sentence]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sentenceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Sentence ID
 *     responses:
 *       200:
 *         description: Sentence deleted successfully
 *       404:
 *         description: Sentence not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/sentences/:sentenceId', authMiddleware, sentenceController.deleteSentence);

export default router;
