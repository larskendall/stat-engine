'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import routing from './emails.routes';

// modules
import emailsHome from './emails-home';
import emailsEdit from './emails-edit';

export default angular.module('statEngineApp.emails', [uiRouter, emailsHome, emailsEdit])
  .config(routing)
  .name;
