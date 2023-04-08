import { Router } from 'express';

import { EndController } from '../controller/EndController';

const end = Router();
const control = new EndController();

end.post('/create-end', control.create);
end.get('/:id/', control.findById);
end.get('/', control.listMany);

export { end };
