'use strict';

import moment from 'moment-timezone';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('site.report', {
      abstract: true,
    })
    .state('site.report.edit', {
      url: '/reports/:type/:name/edit',
      views: {
        'content@': {
          template: require('./report-edit/report-edit.html'),
          controller: 'ReportEditController',
          controllerAs: 'vm'
        },
      },
      data: {
        roles: ['department_admin']
      },
      resolve: {
        deps() {
          return Promise.all([
            import(/* webpackChunkName: "angular-timeline" */ 'angular-timeline/dist/angular-timeline.js'),
            import(/* webpackChunkName: "bootstrap-js" */ 'bootstrap/dist/js/bootstrap')
          ]);
        },
        currentPrincipal(Principal) {
          return Principal.identity();
        },
        report(Report, $q, $stateParams) {
          var deferred = $q.defer();

          Report.get({ type: $stateParams.type, name: $stateParams.name }).$promise
            .then(report => deferred.resolve(report))
            .catch(() => deferred.resolve(null));

          return deferred.promise;
        },
        weatherForecast(report, Weather, $stateParams) {
          if(!report) return Weather.getForecast({ date: $stateParams.name }).$promise;
        },
        safetyMessage(report, Safety) {
          if(!report) return Safety.getRandomMessage().$promise;
        },
        stats(report, Stats, $stateParams) {
          if(!report) return Stats.getDaily({ date: $stateParams.name }).$promise;
        },
      },
    })
    .state('site.report.today', {
      url: '/reports/today',
      redirectTo: () => {
        const now = moment();
        return {
          state: 'site.report.view',
          params: {
            type: 'daily',
            name: now.format('YYYY-MM-DD'),
          }
        };
      }
    })
    .state('site.report.today.edit', {
      url: '/reports/today/edit',
      redirectTo: () => {
        const now = moment();
        return {
          state: 'site.report.edit',
          params: {
            type: 'daily',
            name: now.format('YYYY-MM-DD'),
          }
        };
      }
    })
    .state('site.report.history', {
      url: '/reports/history',
      views: {
        'content@': {
          template: require('./report-history/report-history.html'),
          controller: 'ReportHistoryController',
          controllerAs: 'vm'
        },
      },
      data: {
        roles: ['user']
      },
      resolve: {
        savedReports(Report) {
          return Report.query().$promise;
        },
      },
    })
    .state('site.report.view', {
      url: '/reports/:type/:name',
      views: {
        'content@': {
          template: require('./report-view/report-view.html'),
          controller: 'ReportViewController',
          controllerAs: 'vm'
        },
      },
      data: {
        roles: ['user']
      },
      resolve: {
        currentPrincipal(Principal) {
          return Principal.identity();
        },
        report(Report, $q, $stateParams) {
          var deferred = $q.defer();

          Report.get({ type: $stateParams.type, name: $stateParams.name }).$promise
            .then(report => deferred.resolve(report))
            .catch(() => deferred.resolve(null));

          return deferred.promise;
        },
        view(Report, $stateParams, report) {
          if(report) return Report.view({ type: $stateParams.type, name: $stateParams.name }).$promise;
        },
        // eslint-disable-next-line
        reportMetrics(currentPrincipal, Report, $stateParams, report, view) {
          if(report && currentPrincipal.isDepartmentAdmin) return Report.getMetrics({ type: $stateParams.type, name: $stateParams.name }).$promise;
        },
      },
    })
    .state('site.report.metrics', {
      url: '/reports/:type/:name/metrics',
      views: {
        'content@': {
          template: require('./report-metrics/report-metrics.html'),
          controller: 'ReportMetricsController',
          controllerAs: 'vm'
        },
      },
      data: {
        roles: ['department_admin']
      },
      resolve: {
        deps($ocLazyLoad) {
          return Promise.all([
            import(/* webpackChunkName: "ui-grid" */ 'angular-ui-grid/ui-grid').then(() => $ocLazyLoad.inject('ui.grid'))
          ]);
        },
        currentPrincipal(Principal) {
          return Principal.identity();
        },
        report(Report, $q, $stateParams) {
          var deferred = $q.defer();

          Report.get({ type: $stateParams.type, name: $stateParams.name }).$promise
            .then(report => deferred.resolve(report))
            .catch(() => deferred.resolve(null));

          return deferred.promise;
        },
        reportMetrics(Report, $stateParams, report) {
          if(report) return Report.getMetrics({ type: $stateParams.type, name: $stateParams.name }).$promise;
        },
        fireDepartmentUsers(FireDepartment, currentPrincipal) {
          return FireDepartment.getUsers({ id: currentPrincipal.FireDepartment._id }).$promise;
        }
      },
    });
}
