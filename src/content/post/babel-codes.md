---
title: Babel 변환코드
category: Tech
tags:
  - babel
  - es2015
  - transpiler
date: '2016-07-26 11:10:25'
---

## 코드 변환 형태

### 1. [class](https://babeljs.io/docs/learn-es2015/#classes)

**es6**

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  method() {
    return 'return value';
  }
}
```

**es5 (Normal mode)**

```js
var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Point = (function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [
    {
      key: 'method',
      value: function method() {
        return 'return value';
      },
    },
  ]);

  return Point;
})();
```

**es5 (Loose mode)**

```js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Point = (function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  Point.prototype.method = function method() {
    return 'return value';
  };

  return Point;
})();
```

### 2. extends

**es6**

```js
class InfiniteGrid extends Component {}
```

**es5 (Normal, Loose mode)**

```js
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteGrid = function (_Component) {
 _inherits(InfiniteGrid, _Component);
```

### 3. arrow function

**es6**

```js
**> {**
  this.a = 1;
};
```

**es5 (Normal, Loose mode)**

```js
var _this = this;
function(v,i) {
   _this.a = 1;
};
```

> arrow function 내부에서 this가 없을 경우, \_this 또는 self등을 선언하지 않는다.

### 4. [default parameter](https://babeljs.io/docs/learn-es2015/#default--rest--spread)

**es6**

```js
function(itmes = this.items) {}
```

**es5 (Normal, Loose mode)**

```js
function() {
   var items = arguments.length <= 0 || arguments[0] === undefined ? this.items : arguments[0];
}
```

### 5. [spread operator](https://babeljs.io/docs/learn-es2015/#default--rest--spread)

**es6**

```js
this._appendCols = [...arr];
```

**es5 (Normal mode)**

```js
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
this._appendCols = [].concat(_toConsumableArray(arr));
```

**es5 (Loose mode)**

```js
this._appendCols = [].concat(arr);
```

### 6. [let, const](https://babeljs.io/docs/learn-es2015/#let--const)

**es6**

```js
**st a;**
let b;
```

**es5 (Normal, Loose mode)**

```js
var a;
var b;
```

> let,const의 경우, var로 변경되며, babel transform시 let과 const의 유효성 검사를 한다.

```
Module build failed: TypeError: /Users/naver/workspace/infiniteGrid/src/es6/infiniteGrid.js: Duplicate declaration "x"
  777 |     x = "bar";
  778 |     // error, already declared in block
> 779 |     let x = "inner";
      |         ^
  780 |   }
  781 | }
```

### 7. [enhanced Object Literals](https://babeljs.io/docs/learn-es2015/#enhanced-object-literals)

**es6**

```js
var a = 'key';
**r b = {**
  [a]: 30,
};
```

**es5 (Normal mode)**

```js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var b = _defineProperty({}, a, 30);
```

**es5 (Loose mode)**

```js
var a = 'key';
var b = ((_b = {}), (_b[a] = 30), _b);
```

### 8. [template Strings](https://babeljs.io/docs/learn-es2015/#template-strings)

**es6**

```js
var name = 'Bob',
  time = 'today';
**w are you ${time}?`;**
```

**es5 (Normal, Loose mode)**

```js
var name = 'Bob',
  time = 'today';
'Hello ' + name + ', how are you ' + time + '?';
```

### 9. [destructring](https://babeljs.io/docs/learn-es2015/#destructuring)

**es6**

```js
var [a, , b] = [1, 2, 3];
var {
  op: a,
**lhs: { op: b },**
  rhs: c,
} = getASTNode();
```

**es5 (Normal, Loose mode)**

```js
var _ref = [1, 2, 3];
var a = _ref[0];
var b = _ref[2];
var _getASTNode = getASTNode();
var a = _getASTNode.op;
var b = _getASTNode.lhs.op;
var c = _getASTNode.rhs;
```

## 코드 변환과 Polyfill이 필요한 형태

### 1. [generators](https://babeljs.io/docs/learn-es2015/#generators)

**es6**

```js
var fibonacci = {
  [Symbol.iterator]: function* () {
    **0,**
      cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  },
};

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000) break;
}
```

**es5 (Normal mode)**

```js
var fibonacci = _defineProperty(
  {},
  Symbol.iterator,
  regeneratorRuntime.mark(function _callee() {
    var pre, cur, temp;
    return regeneratorRuntime.wrap(
      function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              (pre = 0), (cur = 1);

            case 1:
              temp = pre;

              pre = cur;
              cur += temp;
              _context.next = 6;
              return cur;

            case 6:
              _context.next = 1;
              break;

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      },
      _callee,
      this
    );
  })
);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (
    var _iterator = fibonacci[Symbol.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = true
  ) {
    var n = _step.value;

    // truncate the sequence at 1000
    if (n > 1000) break;
  }

  // if el is jQuery instance, el should change to HTMLElement.
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
```

**es6 (Loose mode)**

```js
var fibonacci =
  ((_fibonacci = {}),
  (_fibonacci[Symbol.iterator] = regeneratorRuntime.mark(function _callee() {
    **emp;**
    return regeneratorRuntime.wrap(
      function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              (pre = 0), (cur = 1);

            case 1:
              temp = pre;

              pre = cur;
              cur += temp;
              _context.next = 6;
              return cur;

            case 6:
              _context.next = 1;
              break;

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      },
      _callee,
      this
    );
  })),
  _fibonacci);

for (
  var _iterator = fibonacci,
    _isArray = Array.isArray(_iterator),
    _i = 0,
    _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
  ;

) {
  var _ref;

  if (_isArray) {
    if (_i >= _iterator.length) break;
    _ref = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) break;
    _ref = _i.value;
  }

  var n = _ref;

  // truncate the sequence at 1000
  if (n > 1000) break;
}
```

### 2. [iterator](https://babeljs.io/docs/learn-es2015/#iterators--forof)

**es6**

```js
let fibonacci = {
  [Symbol.iterator]() {
    **0,**
      cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur };
      },
    };
  },
};

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000) break;
}
```

**es5 (Normal mode)**

```js
var fibonacci = _defineProperty({}, Symbol.iterator, function () {
  var pre = 0,
    cur = 1;
  return {
    next: function next() {
      var _ref = [cur, pre + cur];
      pre = _ref[0];
      cur = _ref[1];

      return { done: false, value: cur };
    },
  };
});

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (
    var _iterator = fibonacci[Symbol.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = true
  ) {
    var n = _step.value;

    // truncate the sequence at 1000
    if (n > 1000) break;
  }

  // if el is jQuery instance, el should change to HTMLElement.
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
```

**es5 (Loose mode)**

```js
var fibonacci =
  ((_fibonacci = {}),
  (_fibonacci[Symbol.iterator] = function () {
    var pre = 0,
      cur = 1;
    return {
      next: function next() {
        var _ref = [cur, pre + cur];
        pre = _ref[0];
        cur = _ref[1];

        return { done: false, value: cur };
      },
    };
  }),
  _fibonacci);

for (
  var _iterator = fibonacci,
    _isArray = Array.isArray(_iterator),
    _i = 0,
    _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
  ;

) {
  var _ref2;

  if (_isArray) {
    if (_i >= _iterator.length) break;
    _ref2 = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) break;
    _ref2 = _i.value;
  }

  var n = _ref2;

  // truncate the sequence at 1000
  if (n > 1000) break;
}
```

## Polyfill Library만 필요한 형태

Map, Set, WeakMap, WeakSet, Promise, Reflect, Symbol

```js
var p = timeout(1000)
  .then(() => {
    return timeout(2000);
  })
  .then(() => {
    throw new Error('hmm');
  })
  .catch((err) => {
    return Promise.all([timeout(100), timeout(200)]);
  });
```
