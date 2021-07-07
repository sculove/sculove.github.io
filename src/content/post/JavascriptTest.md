---
title: JavaScript Test
category: Tech
tags:
  - test
  - mocha
  - chai
  - karma
  - coverage
  - sinon
date: '2016-05-17 14:22:18'
thumbnail: ./images/JavascriptTest/mocha-chaijs.png
---

JavaScript는 사용자 행위를 직접적으로 담당하는 부분이기 때문에, 예외 사항도 많고, 고민해야할 부분도 많다. 뿐만아니라, 사용자의 행위에 따른 대응(?)이 거의 대부분 비동기의 이벤트로 처리하기 때문에, 실제로 무결점의 프로그램을 개발하기는 쉬운 문제가 아니다.

이 글은 이러한 JavaScript를 효과적으로 테스트하고 유지보수하기 위해, 테스트 환경을 구축하는 간단한 메모이다.

## 테스트 프레임웍 (Mocha + chai)

JavaScript 테스트 프레임웍은 대표적으로 QUnit, Mocha, Jasmine과 같은 프레임웍이 존재한다. 각자 장단점이 있지만, 이 글에서는 가장 확장성이 용이한, mocha에 대해 이야기한다.
[mocha](http://mochajs.org/)는 node와 브라우저 모두에 적용할 수 있고, TDD, BDD, QUnit, export 스타일 모두 적용할 수 있는 프레임웍이다. assertion문 또한, 취향(?)에 따라 선택하여 적용할 수 있다.
많은 assertion문이 있지만, expect, should, assert를 모두 지원하는 [chai](http://chaijs.com/)와 함께 mocha를 사용해 보자.
![](./images/JavascriptTest/mocha-chaijs.png)

### 설치

```bash
npm install mocha chai --save-dev
```

### 환경 설정

#### mocha

mocha는 mocha.opt 파일을 통해 옵션을 설정할 수 있으며, mocha cli를 이용하여 테스트를 진행 할 수 있다.

```bash
./node_modules/.bin/mocha
```

#### chai

chai는 chai.expect, chai.should, chai.assert와 같이 사용해야함으로 귀찮다. 전역에 expect, should, assert를 저장하여, 테스트 코드에서는 expect, should, assert를 사용할 수 있도록 하자.
isomorphic 환경을 위해, require 지원여부에 따라 처리하는 파일을 테스트 파일 전에 포함시킨다.

```js
var expect;
var assert;
if (typeof require === 'function') {
  var chai = require('chai');
  expect = chai.expect;
  assert = chai.assert;
  chai.should();
} else {
  expect = chai.expect;
  chai.should();
}
```

> [chai-http](https://github.com/chaijs/chai-http)를 이용하면 request에 대한 테스트도 할 수 있다.

## 테스트 러너 (karma)

JavaScript는 브라우저 환경에 따라, 테스트 결과가 달라지기 때문에, 실제 브라우저에서 테스트를 꼭! 해야만한다. 테스트 러너는 여러 환경에서 동일 테스트를 호출 할 수 있다.

![](./images/JavascriptTest/karma.png)

대표적인 툴로 [Karma](https://karma-runner.github.io/)가 있다.

### mocha와 연동

mocha와 연동하기 위해서는 [karma-mocha](https://github.com/karma-runner/karma-mocha)를 설치하고, mocha 스타일의 로깅을 보고자 한다면, [karma-mocha-repoter](https://github.com/litixsoft/karma-mocha-reporter)를 설치한다.

### 커버리지 연동

커버리지 툴인 istanbul을 연동하기 위해서는 [karma-coverage](https://github.com/karma-runner/karma-coverage)를 설치한다.

### 브라우저

실제 Karma를 이용하여 테스트를 해보니, 꼭 브라우저만 테스트 할 수 있는게 아니라, 여러가지 타스크를 한꺼번에 실행하는 용도로 사용 할 수도 있을 것 같다.
https://karma-runner.github.io/0.13/config/browsers.html

[karma-script-launcher](https://github.com/karma-runner/karma-script-launcher)를 이용하면 다음과 같이 브라우저를 script로 실행할수 있다. 첫번째 파라미터로 url이 전달된다.

```js
// in the karma.conf.js
browsers: ['/usr/local/bin/custom-browser.sh'],
```

## ES6 지원

소스와 테스트 파일을 ES6로 작성한 경우에는 테스트가 실행 되기 전에 사전에 컴파일을 할수 있다.
![](./images/JavascriptTest/es6-logo.png)

### mocha

- `--compilers` 옵션을 이용하여 babel-register,등과 같은 모듈을 이용하여 테스트전에 컴파일 할 수 있다. 하지만, 테스트 환경(node, browser)이 es6을 지원하면 그럴 필요도 없다.

```bash
./node_modules/.bin/mocha --compilers js:babel-register
```

- `--harmony` 옵션을 사용하여 테스트 코드에 대해 ES6을 사용할 수 있다.

### karma

- karma의 preprocessors를 이용
- [karma-babel-preprocessor](https://github.com/babel/karma-babel-preprocessor)를 함께 사용하여, 테스트 전 코드(테스트 코드와, 실제소소)를 변환
- babel 변경시, es6을 umd방식으로 변경해야 정상동작함. (브라우저에서는 commonjs를 지원하지 않음)
  http://stackoverflow.com/questions/33915575/babel-karma-babel-processor-not-converting-es6-es5-for-karma-tests

## Mock-up

JavaScript는 비동기 상황을 테스트해야하기 때문에, 실제로 테스트 코드를 짜는 것은 굉장히 까다로운 작업이 될수 있다. 이러한 것을 해결하기 위한 하나의 방법으로 stub, mock object를 만드는 방법이 있다.

> **Mock VS Stub**

1. 어떻게 테스트 결과를 검증하는가? (상태 검증 VS 행위 검증)
2. 테스팅하고 디자인하는 철학적인 차이
   http://martinfowler.com/articles/mocksArentStubs.html

### Sinon.JS

[sinon](http://sinonjs.org/)은 spy, stub, mock, fakeTimer, fackHttpRequest, fackServer, 등을 지원하는 단위테스트 프레임웍이다.

- 함수 호출 여부(행위)를 검증하고자 한다면, stub를 이용한다. (이벤트의 핸들러 테스트)
- [timer](http://sinonjs.org/docs/#clock), [XMLHTTPRequest](http://sinonjs.org/docs/#server)의 fake 테스트가 가능

개인적으로... 써보니 제약은 있지만, 꽤 좋은 라이브러리다.이건 별도로 더 확인해 봐야 겠다.
