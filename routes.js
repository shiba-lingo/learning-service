import express from 'express';
import * as vocabularyController from "./controllers/vocabularyController.js";
import * as sentenceController from "./controllers/sentenceController.js";

const router = express.Router();

// Vocabulary Service Routes
router.post('/vocabularies', vocabularyController.createVocabulary);                      
router.get('/vocabularies', vocabularyController.getAllVocabularies);                 
router.get('/vocabularies/:vocabularyId', vocabularyController.getVocabularyById);               
router.put('/vocabularies/:vocabularyId', vocabularyController.updateVocabulary);              
router.delete('/vocabularies/:vocabularyId', vocabularyController.deleteVocabulary); 

// Sentence Service Routes
router.post('/sentences', sentenceController.createSentence);                      
router.get('/sentences', sentenceController.getAllSentences);                 
router.get('/sentences/:sentenceId', sentenceController.getSentenceById);               
router.put('/sentences/:sentenceId', sentenceController.updateSentence);              
router.delete('/sentences/:sentenceId', sentenceController.deleteSentence); 

export default router;


