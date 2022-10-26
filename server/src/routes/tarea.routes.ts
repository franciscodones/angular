import { Router } from 'express';
import { deleteTarea, getTarea, getTareas, postTarea, putTarea } from '../controllers/tarea.controller';

const router = Router();

router.get('/', getTareas);
router.get('/:id', getTarea);
router.delete('/:id', deleteTarea);
router.post('/', postTarea);
router.put('/:id', putTarea);

export default router;