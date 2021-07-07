---
title: Reactive Programming
category: Tech
thumbnail: ./images/Reactive-Programming/stream.png
tags:
  - rxjs
  - reactive
  - observable
  - observer
  - subscribe
  - programing
  - functional
date: '2016-06-22 10:47:15'
---

이 글은 기존에 잘 정리된 문서를 보고 학습한 결과를 바탕으로 제 기준으로 다시 간단히 정리한 문서입니다.

## Reactive Programming 이란?

![](./images/Reactive-Programming/stream.png)

### 참조 문서

https://gist.github.com/staltz/868e7e9bc2a7b8c1f754

- Reactive Programming에 대한 설명과 예제를 다룬 글
- 이에 대한 egghead.io 강의 https://egghead.io/courses/introduction-to-reactive-programming
- Reactive Programming 개발 방법 익히기에 대해 정리한 어느 분의 문서
  http://mobicon.tistory.com/467

### Reactive Programming

> Reactive programming is programming with asynchronous data streams.
> You can listen to that stream and react accordingly.

- Reactive Programing은 기본적으로 모든 것을 스트림(stream)으로 본다. 이벤트, ajax call, 등 모든 데이터의 흐름을 시간순서에 의해 전달되어지는 스트림으로 처리한다. 즉, 스트림이란, 시간순서에 의해 전달되어진 값들의 collection 정도로 이해해 보자.
- 각각의 스트림은 새로 만들어(branch)져서 새로운 스트림이 될 수도 있고, 여러개의 스트림이 합쳐(merge) 질수 도 있다.
- 스트림은 map, filter과 같은 함수형 메소드를 이용하여, immutable하게 처리할 수 있다.
- 스트림을 listening 함으로써 데이터의 결과값을 얻는다. 이를 subscribe라고 표현한다.

![](./images/Reactive-Programming/rxjs_stream.png)

### Observable과 Observer

> An observer subscribes to an Observable. An Observable emits items or sends notifications to its observers by calling the observers’ methods.
> http://reactivex.io/documentation/observable.html

- Observable은 observer의 메소드를 호출하면서 item이나 정보등을 호출(emit)하는 역할을 한다. Observer는 `onNext, onError, onCompleted`의 메소드가 구현되어 있다.
- Observer는 observable을 subscribe한다. Observer는 Subscriber, watcher, reactor로 불려진다.

### 그럼 왜 Reactive Programming 인가?

> Apps nowadays have an abundancy of real-time events of every kind that enable a highly interactive experience to the user. We need tools for properly dealing with that, and Reactive Programming is an answer.

- 함수형으로 만들기 때문에, 하나의 함수는 그 역할 자체에 집중할수 있다.
- Promise의 장점을 극대화할 수 있다.
  Reactive Programming에서 갑자기 Promise를 이야기하는 이유는, RxJS의 Observable이 Promise와 개념적으로 유사하다. 차이가 있다면, `Promise는 단 하나의 value를 다룰 수 있지만, Observable은 다수의 value를 다룰 수 있다.`

  ```js
  myObservable.subscribe(successFn, errorFn);
  myPromise.then(successFn, errorFn);
  ```

  > The Promise is an Observable
  > The Observable is not a Promise
  > ES7 스펙에 Observable이 제안되어 있지만 현재는 표준이 아니다. 하지만, Promise는 Promises/A+ 표준이다.

  처음 Promise를 접할 때에는 좀 낯설었지만, 실제 구현상의 편리함이나, 로직의 심플함, 비동기 처리를 동기식으로 개발할 수 있는 장점 덕분에, 좀더 알아먹기 쉬운 코딩을 할수 있다. 익숙해지면, Observable은 Promise보다 더 강력하다.

- Observable은 A steam에 의해 B stream이 영향을 받는 경우, A만 바꿔도 B가 자동으로 바꿀 수 있도록 구성할 수 있어서, 데이터의 동기화를 간편하게 할 수 있다. 이러한 이유는 A와 B stream 사이의 관계를 `선언적`으로 선언했기 때문에 가능하다. [[예제]](https://jsbin.com/yikabo/3/edit?html,js,output)

### RxJS 참조 문서

#### ReactiveX 공식

http://reactivex.io/

#### stream 생성 static 메소드

https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/which-static.md

#### stream operator

https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/which-instance.md

#### observable api

https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md

#### operator 다이얼그램

http://rxmarbles.com/

### 실습한 예제

실습하면서 공부한 예제
http://jsbin.com/pekemu/edit?js,console,output

### 생각해볼 문제

- map, filter와 같은 함수를 계속 쓰면, 객체를 계속 만드는 거 아닌가?
  > RxJS는 `객체를 재활용함`. 문제없음. 음하하하
  >
  > <iframe src="https://www.slideshare.net/slideshow/embed_code/key/3sawQBCeBad7VI" width="100%" height="500px"></iframe>
  > RxJS and Reactive Programming - Modern Web UI - May 2015 from Ben Lesh
- RxJS와 Reactive Programing은 같은 건가?
  > 아니, RxJS는 Reactive Programming에서 시간을 제어할 수 있는 Schedule 기능, 등이 포함되어 있는 라이브러리이다.
