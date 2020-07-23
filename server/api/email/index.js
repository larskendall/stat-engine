'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';

import * as auth from '../../auth/auth.service';
import * as controller from './email.controller';

const router = new Router();

router.post(
  '/timeRangeAnalysis',
  auth.isApiAuthenticated,
  auth.hasRole('department_admin'),
  bodyParser.json(),
  auth.hasFireDepartment,
  controller.sendTimeRangeAnalysis,
);

router.post(
  '/preview',
  auth.isAuthenticated,
  auth.hasRole('department_admin'),
  bodyParser.json(),
  auth.hasFireDepartment,
  controller.preview,
);

module.exports = router;

export default router;
