// Define a controller and inject scope object into it.
myApp.controller('coinappController', ['$scope', function($scope){
          $scope.coinsAmount=[];
          var $coinage={};
          // an array of coin objects
          var coins = [
              {"val": 200, "symbol": '£2'},
              {"val": 100, "symbol": '£1'},
              {"val": 50, "symbol": '50 pence'},
              {"val": 20, "symbol": '20 pence'},
              {"val": 2, "symbol": '2 pence'},
              {"val": 1, "symbol": '1 pence'}
          ];
          // Input validation and parsing done via code that is encapsulated inside an object to avoid global namespace pollution.
          $coinage.inputValidation=function(){
              var value = document.getElementById('amount').value;
              var $reg = /^(\u00A3)?([0-9\.]+)p?$/;
              var $match = value.match($reg);
               if ($match)
                    {
                    if(value.indexOf("£") > -1 || value.indexOf(".") > -1) {
                      value = value.replace(/[^\d.-]/g, '');
                      value = parseFloat(value).toFixed(2);
                      value= (value * 100).toFixed(0);
                          $scope.error="";
                    } else {
                      value= value.replace(/[^\d.-]/g, '');
                      value = parseFloat(value).toFixed(2);
                          $scope.error="";
                           }

                    } else {
                          $scope.error=" Positive numerical digits, £, and p are only allowed.";
                               value=0;
                           };
                      $scope.value1= value;
                      return coins.map(function (coin, i) {
                      return [Math.floor(value / coin.val), value %= coin.val][0];
                   });
        }
          //Return the result within an array object
          $coinage.getResult = function () {
              var array = $coinage.inputValidation();
              console.log(array);
              var result = [];
              angular.forEach(array, function(value, key) {
                  this.push({coin: coins[key].symbol, amount: value});
              }, result);
              return result;
          };
            // Define an initial function.
            // This initializes the array that is bound with the Angular's view component.
          $scope.init = function () {
              $scope.coinsAmount = $coinage.getResult();
          }
      }]);
