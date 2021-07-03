---
title: Babel 너 믿을수 있니?
category: Tech
thumbnail: ./images/babel-can-you-believe/babel.png
tags:
  - babel
  - es2015
  - transpiler
date: '2016-07-26 12:10:25'
---

누군가나 내 코드를 임의로 바꾼다는 것은 개발자에게는 결코 유쾌한 일이 아닙니다. 더군다나, 사람이 아닌, 기계가 자동적으로 바꾼다는 것은 더욱더 신뢰할 수 없는 일이죠.

하지만, 요즘은 많이 바뀐 것 같습니다. 바로 React라는 인기 라이브러리(통상 React 군을 지칭해서 프레임워크라고 부르기도 합니다)가 등장하면서 부터 사람들의 인식을 많이 바꾼 것 같습니다. 이제는 JSX나 ES6을 적용하기 위해서 코드를 변경하는 것은 그리 두렵거나 우려스러운 일이 아닌거죠.

그래도. 우리가 누군가요? 개발자입니다. 의심이 안들수가 없습니다.
그래서 ES6의 코드를 Babel이 실제로 어떻게 변경하는지 확인해 봤습니다.
확인한 측면은 크게, 코드량. 그리고 코드의 품질면에서 확인했습니다.

## ES6 변환 코드 [Babel 6.10.4기준]

![](./images/babel-can-you-believe/babel.png)

[Babel은 ES6에 가급적이면 근접하게 코드를 변환하는 `Normal Mode`와 가급적 간단한 ES5코드로 변경하는 `Loose Mode`가 있다.](http://www.2ality.com/2015/12/babel6-loose-mode.html#two_modes)

> Loose Mode에 의해 변환된 코드는 빠르고, 하위 브라우저에 안정적인 반면, native ES6 코드로 변경시에는 변경 이슈가 발생할 수 있는 단점이 있다.

다음은 2가지 모드에서 변환된 코드를 기준으로 사이즈를 비교한 표이다.
비교한 사이즈는 JavaScript를 minified한 결과를 바탕으로 추출된 값.

- minified tool - http://www.danstools.com/javascript-minify/

| 구분                 | 상세 스펙                                         | ES6       | Babel Normal mode | Babel Loose mode | 코드 비교 내역                                                                                           |
| -------------------- | ------------------------------------------------- | --------- | ----------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| 코드 변환            | class                                             | 81 Bytes  | `846 Bytes`       | `316 Bytes`      | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#1-class)                    |
| 코드 변환            | extends                                           | 38 Bytes  | `524 Bytes`       | `524 Bytes`      | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#2-extends)                  |
| 코드 변환            | arrow function                                    | 19 Bytes  | 41 Bytes          | 41 Bytes         | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#3-arrow-function)           |
| 코드 변환            | default parameter                                 | 28 Bytes  | 92 Bytes          | 92 Bytes         | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#4-default-parameter)        |
| 코드 변환            | spread operator                                   | 26 Bytes  | `220 Bytes`       | `32 Bytes`       | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#5-spread-operator)          |
| 코드 변환            | let, const                                        | 14 Bytes  | 12 Bytes          | 12 Bytes         | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#6-let-const)                |
| 코드 변환            | enhanced Object Literals                          | 27 Bytes  | `214 Bytes`       | `38 Bytes`       | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#7-enhanced-object-literals) |
| 코드 변환            | template Strings                                  | 64 Bytes  | 68 Bytes          | 68 Bytes         | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#8-template-strings)         |
| 코드 변환            | destructring                                      | 57 Bytes  | 142 Bytes         | 142 Bytes        | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#9-destructring)             |
| 코드 변환 + Polyfill | generators                                        | 156 Bytes | `850 Bytes`       | `691 Bytes`      | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#1-generators)               |
| 코드 변환 + Polyfill | iterator                                          | 164 Bytes | `652 Bytes`       | `497 Bytes`      | [변환 전후 상세 코드](https://sculove.github.io/blog/2016/07/26/babel-codes/#2-iterator)                 |
| Polyfill             | Map/Set/WeakMap/WeakSet, Promise, Reflect, Symbol | N/A       | N/A               | N/A              | N/A                                                                                                      |

## ES6 변환 내역 분석

- Normal mode 보다는 Loose mode의 변환 코드의 양이 더 적다.
- Loose mode가 빠르고, 안정적이다. 다만, native ES6으로 변경시에는 변경 이슈가 존재 할수 있기 때문에 코드에 대한 검수가 꼭 필요하다.
- class, extends의 경우 약간 용량이 큰 것은 사실이지만, 실제 개발자가 구현한다고 하면, Babel의 코드량이 더 작음.

  > class, extends 크기 비교

  - Babel Normal mode (class + extends 함수 크기) : 1,000 Bytes
  - Babel Loose mode (class + extends 함수 크기) : 648 Bytes
  - [Klass](https://github.com/ded/klass) : 1,450 Bytes
  - [jsFace](https://github.com/tnhu/jsface) : 4,349 Bytes

- generators, iterator 의 경우 변환되는 코드의 양이 많다.
- Babel polyfill의 지원 범위가 ES5~ES7+, Web standards, 등까지 넓기 때문에, Babel polyfill의 사이즈는 꽤 큰 편이다. Polyfill과 함께 사용해야하는 스펙 (generator, iterator, Map/Set/WeakMap/WeakSet, Promise, Reflect, Symbol, ...)의 경우에는 [Custom build](https://github.com/zloirock/core-js#custom-build-from-the-command-line)를 사용하여 선별 적용한다.
- 파일별로 스펙에 따른 함수가 추가되기 때문에, [Babel External helpers](http://babeljs.io/docs/plugins/external-helpers/)을 이용하여 코드량을 줄일 수 있다.

## 코드 품질에 대해

이 코드가 나쁜 코드다. 좋은 코드다라는 것은 명확히 있지만, 실제 코드의 단위 조각들만을 보고 코드의 품질을 논하기는 사실상 어렵다고 생각합니다.

하지만, 좋은 코드가 `읽기 쉬운 코드`, `버그가 없는 안정적인 코드`, `실행 속도가 빠른 코드` 라고 한다면, 저의 개인적인 사견으로 본다면, Babel의 Loose mode 코드는 좋은 코드입니다.

Babel의 "Loose" 모드일 경우, 개인적으로 읽기 쉬운 코드였으며, 하위브라우저에서 최적의 성능을 낼수 있도록 ES5 기반하에 작성되어 있었습니다.

> 한마디로 정리한다면... 안타깝지만, Babel 은 저 보다 코드를 더 잘짰습니다. ㅠㅠ

상세한 내역은 [코드 변환 전후](https://sculove.github.io/blog/2016/07/26/babel-codes/)의 내역을 확인하기 바랍니다.

> ES6 도입을 검토하시는 개발자분들이 있다면, Babel에 의한 코드 변화를 의심하는 것보다, 다른 부분을 검토대상으로 고려하는 게 더 좋을 것 같네요.
