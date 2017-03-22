$( document ).ready(function() {
      var numDisplayed = 0;
      var a = null;
      var b = null;
      var op = "?";
      var decimal = false;
      var ndecimal = BASE;
      var sign = false;
      var numb = false;

      $ ( document ).keydown(function(event) {
            event.preventDefault();
            var id = event.key;

            eventPi(id);
            eventNumb(id);

            eventCntrl(id);
            eventDecimals(id);

            eventOp(id);
      });


      $( ".button" ).click(function() {
            var id = $(this).attr('id');

            eventPi(id);
            eventNumb(id);

            eventCntrl(id);
            eventDecimals(id);

            eventOp(id);
      });

      var eventCntrl = function (id) {
            if (isControl(id)) {
                  setControlCalc(id);
            }
      }

      var eventOp = function (id) {
            if ((isOperate(id) || isResult(id)) && id != op) {
                  numDisplayed = makeOperation(id);
                  showDisplay();
                  eraseInput();
                  op = id;
            }
      }

      var eventNumb = function (id) {
            numb = false;
            if (isNumb(id)) {
                  var number = $("#" + id).text();

                  if (op == EQUALS) {
                        reset();
                  }
                  numb = true;
                  setNumDisplay(number);
                  showDisplay();
            }
      }

      var eventPi = function (id) {
            if (id == PI) {
                  numDisplayed = Math.PI;
                  showDisplay();
            }
      }

      var eventDecimals = function (id) {
            if (id == DECIMAL && !decimal) {
                  $ ( "#display" ).append(".");
                  decimal = true;
            }
      }

      var makeOperation = function (id) {
            var result = null;
            setNumbersOp();

            if (op != "?") {
                  result = opTwoOperands(op);
            }
            return result;
      }

      var eraseInput = function () {
            sign = false;
            decimal = false;
            ndecimal = BASE;
            op = "?";
      }

      var printState = function () {
            console.log("numDisplayed : " + numDisplayed);
            console.log("a : " + a);
            console.log("b : " + b);
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
            for (var i = 0 ; i < OPERATES.length; i++) {
                  if (OPERATES[i][IDOP] == id) {
                        return true;
                  }
            }
            return false;
      }

      var setNumbersOp = function () {
            if (a == null) {
                  a = numDisplayed;
            } else {
                  b = numDisplayed;
            }
            // console.log("a : " + a + " b : " + b);
      }

      var opOneOperand = function (id) {
            var result = null;

            for (var i = 0 ; i < OPERATIONONE.length ; i++) {
                  if (OPERATIONONE[i][IDOP] == id){
                        var operation = OPERATIONONE[i][FUNCOP];
                        result = operation(a);
                        $("#text").text(OPERATIONONE[i][TEXT] + "(" + a + ") " + " = " + result);
                        a = result;
                  }
            }
            return result;
      }

      var opTwoOperands = function (id) {
            var result = null;

            for (var i = 0 ; i < OPERATIONSTWO.length ; i++) {
                  if (OPERATIONSTWO[i][IDOP] == id){
                        var operation = OPERATIONSTWO[i][FUNCOP];
                        result = operation(a , b);
                        $("#text").text(a + " " + OPERATIONSTWO[i][TEXT] + " " + b +  " = " + result);
                        a = result;
                        b = null;
                  }
            }
            return result;
      }

      var reset = function () {
            a = b = null;
            numDisplayed = 0;
            op = "?";
            sign = decimal = numb = false;
            ndecimal = BASE;
      }

      var setControlCalc = function (id) {
            if (id == RESET) {
                  reset();
                  showDisplay();
            }

            if (id == SIGN) {
                  swapSign();
                  showDisplay();
            }

            if (id == SAVE) {
                  saveOp();
            }

            if (id == LOAD) {
                  loadOp();
            }
      }

      var swapSign = function () {
            numDisplayed *= -1;
            a = numDisplayed;
            sign = !sign;
      }

      var getIntValueNode = function (node) {
            return parseInt(node.text());
      }

      var showDisplay = function () {
            var n = numDisplayed - Math.floor(numDisplayed);

            if (decimal && n == 0 && numb) {
                  $( "#display" ).append("0");
            } else if (numDisplayed != null) {
                  $( "#display" ).text(numDisplayed);
            } else {
                  $( "#display" ).text("ERROR");
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
            localStorage.setItem("op", op);
            localStorage.setItem("decimal", decimal);
            localStorage.setItem("ndecimal", ndecimal);
            localStorage.setItem("sign", sign);
      }

      var loadOp = function () {
            numDisplayed = parseFloat(localStorage.getItem("numDisplayed"));
            a = parseFloat(localStorage.getItem("a"));
            b = parseFloat(localStorage.getItem("b"));
            op = localStorage.getItem("op");
            decimal = localStorage.getItem("decimal") == "true";
            ndecimal = parseFloat(localStorage.getItem("ndecimal"));
            sign = localStorage.getItem("sign") == "true";
      }
});
