const LOAD = "load", SAVE = "save", RESET = "reset", SIGN = "sign";

const LESS = "less", PLUS = "plus", DIVIDE = "divide";
const MULT = "mult", EQUALS = "equals", DECIMAL = "decimal";
const POW2 = "pow2";

const BASE = 10;

const PI = "pi", SIN = "sin", COS = "cos", TAN = "tan", SQRT = "sqrt", LOG = "log";
const POWN = "powN"

const DANG = 'btn-danger', WARN = 'btn-warning', INFO = 'btn-info', SUCC = 'btn-success', PRI = 'btn-primary'

const DISPLAY = '<div class="col-md-12"> <div id ="display"> 0 </div> </div>';
const ID = 0, NAME = 1, COLOR = 2;
const ROWS = 5;
const COLS = 4;

const IDOP = 0, FUNCOP = 1;

const OPERATIONSTWO = [
      [LESS   , function (a , b) { return a - b; }],
      [PLUS   , function (a , b) { return a + b; }],
      [DIVIDE , function (a , b) { return a / b; }],
      [MULT   , function (a , b) { return a * b; }]
];

const OPERATIONONE = [
      [SIN  , function (a) { return Math.sin (a); }],
      [COS  , function (a) { return Math.cos (a); }],
      [SQRT , function (a) { return Math.sqrt(a); }],
      [LOG  , function (a) { return Math.log (a); }]
];
