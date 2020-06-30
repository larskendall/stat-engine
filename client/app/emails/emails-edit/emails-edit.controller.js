'use strict';

export default class EmailsEditController {
  isLoading = false;
  overlay = null;
  selectedEmailSection = null;

  /*@ngInject*/
  constructor($stateParams) {
    this.$stateParams = $stateParams;

    this.inputEmail = {
      _id: (this.$stateParams.id === 'new') ? null : this.$stateParams.id,
    };

    this.emailSections = [{
      name: 'Notifications',
    }, {
      name: 'Stats',
    }];
  }

  async $onInit() {
  }

  get pageTitle() {
    return this.isNewEmail ? 'New Email' : 'Edit Email';
  }

  get isNewEmail() {
    return (this.inputEmail._id == null);
  }

  hideOverlay() {
    this.overlay = null;
    this.selectedEmailSection = null;
  }

  emailSectionClicked(emailSection) {
    console.log('click');
    this.selectedEmailSection = emailSection;
    this.overlay = 'emailSection';
  }
}
