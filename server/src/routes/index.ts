import { Router } from 'express';
import bodyParser from 'body-parser';
import { getTodo, getTodos, addTodo, deleteTodo, updateTodo } from '../controllers/todos/index';

const router = Router();
const jsonParser = bodyParser.json();

router.get('/api/todos', getTodos);
router.get('/api/todos/:id', getTodo);

router.post('/api/todos', jsonParser, addTodo)

router.put('/api/todos/:id', jsonParser, updateTodo);

router.delete('/api/todos/:id', jsonParser, deleteTodo);

export default router;