//based on http://stackoverflow.com/questions/19644405/simple-angular-directive-for-bootstrap-modal
/*jshint -W072 */
angular.module("seEvents.seBootstrapDialog", ["seEvents.seEventHelperService", "ui.router"]).directive("seBootstrapDialog",
	function ($parse, $timeout, SeEventHelperService, $state, $interpolate, $window) {
/*jshint +W072 */
	"use strict";
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			// UI glitches chrome - dialogs
			$timeout(function() {
				element.css("display", "inline");
			}, 1000);
			var data;
			//Hide or show the modal
			function showModal(visible) {
				if (visible) {
					element.modal({
						backdrop: "static",
						show: true
					});
					data = element.data("bs.modal");
				} else {
					element.modal("hide");
					data = null;
				}
			}

			element.on("hidden.bs.modal", function () {
				SeEventHelperService.safeApply(scope, function() {
					var stateName = $interpolate(attrs.seBootstrapDialogStateGoOnClose)(scope);
					if (!stateName) {
						$window.history.back();
					} else {
						$state.go(stateName);
					}
				});
			});

			scope.$on("$destroy", function() {
				// without this timeout in some cases background is never removed
				// (when state is changed from controller without closing the dialog first)
				// this is kind of bug, because if "debugger" is added after showModal()
				// and user resumes breakpoint - everything is OK
				$timeout(function() {
					if (!element.data("bs.modal") && data) {
						//this is here because when removing scope - background div is not removed, because dialog is already removed
						element.data("bs.modal", data);
						element.removeClass("fade");

						// breaks scroll bars
						$("body").removeClass("modal-open");
					}

					showModal(false);

				});
			});

			if (attrs.seBootstrapDialog) {
				scope.$watch(attrs.seBootstrapDialog, function (newValue) {
					showModal(newValue);
				});
				element.on("hidden.bs.modal", function () {
					// when scope is destroyed and after $timeout() scope.$root is null
					SeEventHelperService.safeApply(scope, function setValue() {
						$parse(attrs.seBootstrapDialog).assign(scope, false);
					});
				});

			} else {
				showModal(true);
			}
		}

	};
});
