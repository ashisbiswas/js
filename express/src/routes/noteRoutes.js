import express from 'express'
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js'
import auth from '../middlewares/auth.js'

const noteRouter  = express.Router()

noteRouter.get('/', auth, getNotes)
noteRouter.post('/', auth, createNote)
noteRouter.put('/:id', auth, updateNote)
noteRouter.delete('/:id', auth, deleteNote)


export default noteRouter