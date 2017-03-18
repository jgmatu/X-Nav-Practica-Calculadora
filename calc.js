$( document ).ready(function() {
      var numDisplayed = 0;
      var a = 0;
      var b = 0;
      var result = 0;
      var op = "";
      var decimal = false;
      var ndecimal = BASE;
      var sign = false;

      $( ".button" ).click(function() {
            var id = $(this).attr('id');

            clickControl(id);
            clickOperation(id);
            clickNumb(id);
            clickPi(id);
            clickDecimals(id);
      });

      var clickControl = function (id) {
            if (isControl(id)) {
                  setControlCalc(id);
                  decimal = false;
                  ndecimal = BASE;
            }
      }

      var clickOperation = function (id) {
            if (isOperate(id) || isResult(id)) {
                  makeOperation(id);
                  op = id;
            }
      }

      var clickNumb = function (id) {
            if (isNumb(id)) {
                  var number = $("#" + id).text();

                  if (op == EQUALS) {
                        resetDisplay();
                        reset();
                  }

                  setNumDisplay(number);
                  showDisplay();
            }
      }

      var clickPi = function (id) {
            if (id == PI) {
                  numDisplayed = Math.PI;
                  showDisplay();
            }
      }

      var clickDecimals = function (id) {
            if (id == DECIMAL && !decimal) {
                  if (numDisplayed == 0) {
                        resetDisplay();
                  }
                  decimal = true;
            }
      }

      var makeOperation = function (id) {
            setNumbersOp();
            realizeOperationTwoOperands(op);
            realizeOperationOneOperand(id);
            setResult();
            saveLastOp();
            showDisplay();
            eraseInput();
      }

      var eraseInput = function () {
            numDisplayed = 0;
            sign = false;
            decimal = false;
            ndecimal = BASE;
      }

      var printState = function () {
            console.log("numDisplayed :   " + numDisplayed);
            console.log("a : " + a);
            console.log("b : " + b);
            console.log("result : " + result);
            console.log("op : " + op);
            console.log("decimal : " + decimal);
            console.log("ndecimal : " + ndecimal);
            console.log("sign : " + sign);
      }

      var isResult = function (id) {
            return id == EQUALS && op != EQUALS;
      }

      var isNumb = function (id) {
            return id == "0" || id == "1" || id == "2" || id == "3" ||
                        id == "4" || id == "5" || id == "6" || id == "7" ||
                        id == "8" || id == "9";
      }

      var isControl = function (id) {
            return id == SAVE || id == LOAD || id == RESET || id == SIGN;
      }

      var isOperate = function (id) {
            return id == LESS || id == PLUS || id == DIVIDE || id == MULT ||
                        id == SIN || id == COS || id == TAN || id == SQRT || id == LOG;
      }

      var setNumbersOp = function () {
            if (a == 0) {
                  a = numDisplayed;
            } else {
                  b = numDisplayed;
            }
            // console.log("a : " + a + " b : " + b);
      }

      var saveLastOp = function () {
            if (a != 0 && b != 0) {
                  a = result;
                  b = 0;
            }
      }

      var realizeOperationOneOperand = function (id) {
            for (var i = 0 ; i < OPERATIONONE.length ; i++) {
                  if (OPERATIONONE[i][IDOP] == id){
                        var operation = OPERATIONONE[i][FUNCOP];
                        result = operation(a);
                  }
            }
      }

      var realizeOperationTwoOperands = function (id) {
            for (var i = 0 ; i < OPERATIONSTWO.length ; i++) {
                  if (OPERATIONSTWO[i][IDOP] == id){
                        var operation = OPERATIONSTWO[i][FUNCOP];
                        result = operation(a , b);
                  }
            }
      }

      var setResult = function () {
            numDisplayed = result;
            saveLastOp();
      }

      var reset = function () {
            a = b = result = numDisplayed = 0;
            op = "";
            sign = decimal = false;
            ndecimal = BASE;
      }

      var setControlCalc = function (id) {
            if (id == RESET) {
                  resetDisplay();
                  reset();
            }
            if (id == SAVE) {
                  saveOp();
            }
            if (id == LOAD) {
                  loadOp();
                  showDisplay();
            }
            if (id == SIGN) {
                  sign = !sign;
                  numDisplayed *= -1;
                  showDisplay();
            }
       }

      var resetDisplay = function () {
            $( "#display" ).text("0");
      }

      var getIntValueNode = function (node) {
            return parseInt(node.text());
      }

      var showDisplay = function () {
            var n = numDisplayed - Math.floor(numDisplayed);

            if (decimal && n == 0) {
                  $( "#display" ).append("0");
            } else {
                  $( "#display" ).text(numDisplayed);
            }
      }

      var setNumDisplay = function (number) {
            if (sign) {
                  number *= -1;
            }
            if (decimal) {
                  numDisplayed += parseInt(number) / ndecimal;
                  ndecimal *= BASE;
            } else {
                  numDisplayed = numDisplayed * BASE + parseInt(number);
            }
      }

      var saveOp = function() {
            localStorage.setItem("numDisplayed", numDisplayed);
            localStorage.setItem("a", a);
            localStorage.setItem("b", b);
            localStorage.setItem("result", result);
            localStorage.setItem("op", op);
            localStorage.setItem("decimal", decimal);
            localStorage.setItem("ndecimal", ndecimal);
            localStorage.setItem("sign", sign);
      }

      var loadOp = function () {
            numDisplayed = parseFloat(localStorage.getItem("numDisplayed"));
            a = parseFloat(localStorage.getItem("a"));
            b = parseFloat(localStorage.getItem("b"));
            result = parseFloat(localStorage.getItem("result"));
            op = localStorage.getItem("op");
            decimal = localStorage.getItem("decimal") == "true";
            ndecimal = parseFloat(localStorage.getItem("ndecimal"));
            sign = localStorage.getItem("sign") == "true";

            if (numDisplayed == 0 && result != 0) {
                  numDisplayed = result;
            }
      }
});
