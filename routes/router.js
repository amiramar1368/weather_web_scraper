import {Router} from 'express';

import {Weather} from '../controllers/weather-controller.js';

const router = new Router();

router.get("/",Weather.renderHomePage);
router.get("/get-weather",Weather.fetchDate)

export default router;