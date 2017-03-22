const LOAD = "Escape", SAVE = "Control", RESET = " ", SIGN = "º";
const LESS = "-", PLUS = "+", DIVIDE = "/";

const MULT = "*", EQUALS = "Enter", DECIMAL = ".";
const POW2 = "pow2";

const BASE = 10;

const PI = "p", SIN = "sin", COS = "cos", TAN = "tan", SQRT = "sqrt", LOG = "log";
const POWN = "Dead"

const DANG = 'btn-danger', WARN = 'btn-warning', INFO = 'btn-info', SUCC = 'btn-success', PRI = 'btn-primary'

const DISPLAY = '<div class="col-md-12"> <div id ="display"> 0 </div> </div>';
const ID = 0, NAME = 1, COLOR = 2;
const ROWS = 5;
const COLS = 4;

const IDOP = 0, FUNCOP = 1, TEXT = 2;

const OPERATIONSTWO = [
      [LESS   , function (a , b) { return a - b; }          , '-'  ],
      [PLUS   , function (a , b) { return a + b; }          , '+'  ],
      [DIVIDE , function (a , b) { return a / b; }          , '/'  ],
      [MULT   , function (a , b) { return a * b; }          , 'x'  ],
      [POWN   , function (a , b) { return Math.pow(a, b); } , 'pow']
];

const OPERATIONONE = [
      [SIN  , function (a) { return Math.sin   (a);    } ,  'sin'],
      [COS  , function (a) { return Math.cos   (a);    } ,  'cos'],
      [SQRT , function (a) { return Math.sqrt  (a);    } , 'sqrt'],
      [LOG  , function (a) { return Math.log10 (a);    } ,'log10'],
      [TAN  , function (a) { return Math.tan   (a);    } ,  'tan'],
      [POW2 , function (a) { return Math.pow   (a, 2); } , 'pow2 ']
];

const OPERATES = OPERATIONONE.concat(OPERATIONSTWO);
