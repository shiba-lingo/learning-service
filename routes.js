import express from 'express';
import * as vocabularyController from "./controllers/vocabularyController.js";
import * as sentenceController from "./controllers/sentenceController.js";
import authMiddleware from './middlewares/auth';

const router = express.Router();

// Vocabulary Service Routes
router.post('/vocabularies', authMiddleware, vocabularyController.createVocabulary);                      
router.get('/vocabularies', authMiddleware, vocabularyController.getAllVocabularies);                 
router.get('/vocabularies/:vocabularyId', authMiddleware, vocabularyController.getVocabularyById);               
router.put('/vocabularies/:vocabularyId', authMiddleware, vocabularyController.updateVocabulary);              
router.delete('/vocabularies/:vocabularyId', authMiddleware, vocabularyController.deleteVocabulary); 

// Sentence Service Routes
router.post('/sentences', authMiddleware, sentenceController.createSentence);                      
router.get('/sentences', authMiddleware, sentenceController.getAllSentences);                 
router.get('/sentences/:sentenceId', authMiddleware, sentenceController.getSentenceById);               
router.put('/sentences/:sentenceId', authMiddleware, sentenceController.updateSentence);              
router.delete('/sentences/:sentenceId', authMiddleware, sentenceController.deleteSentence); 

export default router;

