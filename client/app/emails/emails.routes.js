'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('site.emails', {
      abstract: true,
    })
    .state('site.emails.home', {
      url: '/emails',
      views: {
        'content@': {
          template: require('./emails-home/emails-home.html'),
          controller: 'EmailsHomeController',
          controllerAs: 'vm',
        },
      },
      data: {
        roles: ['department_admin'],
      },
    })
    .state('site.emails.edit', {
      url: '/emails/:id',
      views: {
        'content@': {
          template: require('./emails-edit/emails-edit.html'),
          controller: 'EmailsEditController',
          controllerAs: 'vm',
        },
      },
      data: {
        roles: ['department_admin'],
      },
    });
}
