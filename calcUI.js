var config = [
      [SIGN, '+/-', WARN], [SAVE , 'M+', PRI], [LOAD , 'M', WARN], [RESET , 'CE', DANG], ['7' ,'7', SUCC] , ['8','8', SUCC],
      ['9','9', SUCC], [PLUS ,'+', INFO], ['4', '4', SUCC], ['5', '5', SUCC], ['6', '6', SUCC], [LESS, '-', INFO],
      ['1', '1', SUCC], ['2', '2', SUCC], ['3', '3', SUCC], [MULT, 'x', INFO], ['0', '0', SUCC], [DECIMAL, '.', SUCC],
      [EQUALS, '=', INFO], [DIVIDE, '/', INFO]
];

var SciFY = [
      [PI, 'PI', PRI], [SIN, 'sin(x)', PRI], [COS, 'cos(x)', PRI], [TAN, 'tan(x)', PRI],
      [SQRT, 'sqrt(x)', PRI], [LOG, 'log(x)', PRI], [POW2, 'x^2', PRI], [POWN, 'x^y', PRI]
];

var nCfg = 0;

$( document ).ready( function() {
      $ ( "body" ).append('<div id ="calc" class="container"></div>');
      $ ( "#SciFY" ).show();
      $ ( "#Basic" ).hide();

      var createButton = function (idRow, cfg) {
            var id = cfg[nCfg][ID];
            var name = cfg[nCfg][NAME];
            var color = cfg[nCfg][COLOR];

            nCfg = nCfg + 1;
            var button = '<div class="col-md-3"> \
                              <div id="' + id + '" class ="button"> \
                                    <button type="button" class="btn btn-block ' + color + '">' + name + '</button> \
                              </div> \
                          </div>';
            $("#r" + idRow).append(button);
      }

      var appendCols = function (idRow, cfg) {
            for (var i = 0 ; i < COLS ; i++) {
                  createButton(idRow, cfg);
            }
      }

      var appendBasicRows = function () {
            nCfg = 0;
            for (var i = 0 ; i < (config.length - 1) / COLS; i++) {
                  $ ("#calc").append('<div id="r' + i + '" class="row">');
                  appendCols(i, config);
                  $ ("#calc").append('</div>');
            }
      }

      var appendSciFyRows = function (isHide) {
            nCfg = 0;
            for (var i = ROWS; i < ROWS + (SciFY.length - 1) / COLS; i++) {
                  $ ("#calc").append('<div id="r' + i + '" class="row">');
                  appendCols(i, SciFY);
                  $ ("#calc").append('</div>');
                  $ ("#r" + i).hide();
            }
      }

      var createCalc = function() {

            $ ("#calc").append('<div id="disp" class="row">' + DISPLAY + '</div>')
            appendBasicRows();
            appendSciFyRows();
      }
      createCalc();

      $("#SciFY").click(function() {
            $( this ).hide();
            $("#Basic").show();

            for (var i = ROWS ; i < ROWS + (SciFY.length - 1) / COLS; i++) {
                  $("#r" + i).show();
            }
      });

      $("#Basic").click(function() {
            $( this ).hide();
            $("#SciFY").show();

            for (var i = ROWS ; i < ROWS + (SciFY.length - 1) / COLS; i++) {
                  $("#r" + i).hide();
            }
      });


});
