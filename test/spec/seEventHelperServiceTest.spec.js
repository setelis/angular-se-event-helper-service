describe("SeEventHelperService", function () {
	"use strict";

	var SeEventHelperService, scope;
	var callbackResolved, callbackRejected;

	beforeEach(module("seEvents.seEventHelperService", function() {
	}));
	beforeEach(inject(function (_SeEventHelperService_, $rootScope) {
		SeEventHelperService = _SeEventHelperService_;
		scope = $rootScope.$new();

		callbackResolved = jasmine.createSpy("callbackResolved");
		callbackRejected = jasmine.createSpy("callbackRejected");
	}));
	describe("whenSet", function () {
		it("should call callback if value is set", inject(function () {
			var promise = SeEventHelperService.whenSet(scope, "a");
			promise.then(callbackResolved, callbackRejected);
			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.a = "hello";
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(1);
			expect(callbackResolved.calls.first().args.length).toBe(1);
			expect(callbackResolved.calls.first().args[0]).toBe("hello");
			expect(callbackRejected.calls.count()).toBe(0);
		}));
		it("should call callback if value is set before whenSet", inject(function () {
			scope.a = "hello2";

			var promise = SeEventHelperService.whenSet(scope, "a");
			promise.then(callbackResolved, callbackRejected);
			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(1);
			expect(callbackResolved.calls.first().args.length).toBe(1);
			expect(callbackResolved.calls.first().args[0]).toBe("hello2");
			expect(callbackRejected.calls.count()).toBe(0);
		}));
		it("should not call callback if value is null", inject(function () {
			var promise = SeEventHelperService.whenSet(scope, "a");
			promise.then(callbackResolved, callbackRejected);
			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.a = null;
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);
		}));
		it("should not call callback if value is undefined", inject(function () {
			scope.a = null;

			var promise = SeEventHelperService.whenSet(scope, "a");
			promise.then(callbackResolved, callbackRejected);
			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.a = undefined;
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);
		}));
		it("should not call callback if value is undefined and then null", inject(function () {
			scope.a = null;

			var promise = SeEventHelperService.whenSet(scope, "a");
			promise.then(callbackResolved, callbackRejected);
			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.a = undefined;
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.a = null;
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);
		}));
		it("should not call callback if value is null and then undefined", inject(function () {
			var promise = SeEventHelperService.whenSet(scope, "a");
			promise.then(callbackResolved, callbackRejected);
			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.a = null;
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.a = undefined;
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);
		}));
		it("should not call callback if value is null and will call handler when changed", inject(function () {
			var promise = SeEventHelperService.whenSet(scope, "a");
			promise.then(callbackResolved, callbackRejected);
			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.a = null;
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.a = "hello3";
			expect(callbackResolved.calls.count()).toBe(0);
			expect(callbackRejected.calls.count()).toBe(0);

			scope.$digest();
			expect(callbackResolved.calls.count()).toBe(1);
			expect(callbackResolved.calls.first().args.length).toBe(1);
			expect(callbackResolved.calls.first().args[0]).toBe("hello3");
			expect(callbackRejected.calls.count()).toBe(0);
		}));
	});

});
