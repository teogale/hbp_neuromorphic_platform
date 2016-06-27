angular.module('clb-ui-identity')
.directive('clbUserAvatar', clbUserAvatar);

/**
 * Display an square icon for a user.
 *
 * Attributes
 * ----------
 *
 * ==================  ====================================
 * Name                Description
 * ==================  ====================================
 * clb-user            The ClbUser instance to display
 * ==================  ====================================
 *
 * @namespace clbUserAvatar
 * @memberof module:clb-ui-identity
 * @return {Object} Directive Descriptor
 * @example <caption>Display user avatar</caption>
 * <clb-user-avatar clb-user="vm.currentUser"></clb-user-avatar>
 */
function clbUserAvatar() {
  'use strict';
  console.log('INIT');
  return {
    restrict: 'EA',
    scope: {
      user: '=clbUser'
    },
    templateUrl: 'user-avatar.directive.html',
    link: function(scope, elt) {
      elt.addClass('clb-user-avatar');
      if (scope.user.displayName) {
        scope.char = scope.user.displayName[0].toUpperCase();
      }
      // an official color set has to be found.
      var words = scope.user.displayName.split(/\s+/, 2);
      var initials = (String(words[0][0]) +
        (words[1] ? words[1][0] : words[0][1]))
        .toUpperCase();
      scope.hueNumber = (13 * initials.charCodeAt(0) * 23 *
        initials.charCodeAt(1)) % 7 + 1;
    }
  };
}
