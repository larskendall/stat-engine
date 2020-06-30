'use strict';

import angular from 'angular';

import EmailsHomeController from './emails-home.controller';

export default angular.module('stateEngineApp.emails.home', [])
  .controller('EmailsHomeController', EmailsHomeController)
  .name;
