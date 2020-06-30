'use strict';

export default class EmailsHomeController {
  isLoading = false;

  /*@ngInject*/
  constructor($state) {
    this.$state = $state;
  }

  async $onInit() {
    // this.emails = [];
    this.emails = [{
      _id: 1,
      name: 'Daily',
      description: 'Daily email',
      schedule: 'Every day at 8:00am',
      enabled: true,
      config: {},
    }, {
      _id: 2,
      name: 'Weekly',
      description: 'Weekly email',
      schedule: 'Every Monday at 8:00am',
      enabled: true,
      config: {},
    }];
  }

  create() {
    this.$state.go('site.emails.edit', { id: 'new' });
  }

  select(e, email) {
    this.$state.go('site.emails.edit', { id: email._id });
  }
}
