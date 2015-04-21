'use strict';

import React from 'react';
import StudentTable from './components/StudentTable';
import angular from 'angular';
import ngReact from 'ngReact';
import _ from 'lodash';

var app = angular.module('app', ['react']);

app.service('API', ["$http", "$q", function ($http, $q) {
	return {
		getList: function () {
			var deferred = $q.defer();
			$http.get('http://localhost:4000/api/getlist')
			.success(function (data) {
				deferred.resolve(data)
			}, function (e) {
				deferred.reject(new Error(e))
			});
			return deferred.promise;
		},
		postStudent: function(data){
			var deferred = $q.defer();
			$http.post('http://localhost:4000/api/post', data)
			.success(function (data) {
				deferred.resolve(data)
			}, function (e) {
				deferred.reject(new Error(e))
			});
			return deferred.promise;
		}
	}
}]);

app.controller('scoreTableController', ["$scope", "API",function ($scope, API) {
	$scope.data = {};
	$scope.data.students = [];
	$scope.min = 0;
	$scope.max = 0;
	$scope.avg = 0;

	API.getList().then(function(list){
		$scope.data.students = list;
		if(!_.isEmpty(list)){
			var scores = normalize(list);
			setScores(scores);
		}
	});

	var normalize = function(list){
		return _.pluck(list, 'score').map(e => Number(e));
	};

	var setScores = function(scores){
		$scope.min = Math.min.apply(null, scores);
		$scope.max = Math.max.apply(null, scores);
		$scope.avg = average(scores);
	};

	var average = function(scores){
		return scores.reduce((a,b) => a + b) / scores.length;
	}

	$scope.$watch('data.students', function(oldval, newval){
		if(!_.isEmpty(newval)){
			var scores = normalize(newval);
			setScores(scores);
		}
	});
	$scope.submit = function () {
		API.postStudent($scope.data).then(function(res){
			if(Array.isArray(res)){
				$scope.data.students = res
			}else{
				alert(res);
			}
		})
	}
}]);

app.value('StudentTable', StudentTable);
