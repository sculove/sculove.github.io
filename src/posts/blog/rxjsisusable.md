---
title: RxJS는 쓸 만한가?
category: Tech
tags:
  - rxjs
  - reactive
  - programming
  - flicking
date: '2016-08-22 23:52:56'
thumbnail: ./images/rxjsisusable/rxjs.png
---

요즘 개인적으로 관심 있는 주제가 Reactive Programming 이다. 이 Reactive Programming의 구현체(?)에 해당하는 것 중 하나가 바로 RxJS 이다. RxJS는 Angular2에서 사용되고 있다. 조만간 React도 RxJS를 채택할 것이라는 소문(?)도 들린다. 뿐만 아니라, Rx의 Observable은 이미 ES7의 정식 스펙으로 [제안](https://github.com/tc39/proposal-observable)이 되어 있기도 하다.
Front-End 뿐만 아니라, Android에서는 Rx가 필수 유틸이 될 정도로 자리를 잡고 있고, [게임 개발](http://www.slideshare.net/jongwookkim/ndc14-rx-functional-reactive-programming)에서도 사용하고 있는 것으로 보인다.

### 학습의 진입장벽

개인적으로 Reactive Programming에 대한 학습 진입장벽이 꽤 큰 영역인것 같다.

> 왜? 바로 명령형, 절차적 프로그래밍 학습에 대한 관성이 우리에게 체화되었기에 그런 것으로 보인다.

학교나 회사에서 우리가 배우고 사용했던 프로그래밍 방식의 대부분은 `명령형, 절차적 프로그래밍`이었다. 하지만 이 Reactive Programming의 방식은 `데이터의 흐름을 나타내는 것`에 그 본질이 있다.
따라서, 행위에 대해 `명령`을 하는 것이 아니라, 데이터의 흐름을 `선언` 하는 것이고, 절차적으로 프로그래밍 하는 것이 아니라, 비동기, 병렬 상황에 대해 개발하는 방식이다.
그나마 난 JavaScript 개발자이기에 비동기 상황에 대해서는 익숙하지만, 그래도, 익숙하지 않는 방식이다.
한마디로, `개념의 전환`이 쉽지 않은 것 같다. ㅠㅠ

### RxJS 정말 필요한가?

그렇다면, Reactive Programming의 구현체(?)인 RxJS가 정말 FrontEnd 영역에서 필요할까?

![](./images/rxjsisusable/rxjs.png)

> ### 의문이다.
>
> 뭔가 의미론적으로는 굉장한 좋은 녀석 같은데, 정말 좋은지 모르겠다.

그래서 아직은 익숙하지 않는 RxJS를 이용하여, 비교적 이벤트나 비동기 상황을 제어할 필요가 있는 캐로셀(flicking) 컴포넌트를 만들어 봤다.

#### RxJS 5.0을 사용하여 캐로셀을 만든 예제

<iframe height='420' scrolling='no' src='//codepen.io/sculove/embed/PzgYxb/?height=420&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/sculove/pen/PzgYxb/'>flicking (rxjs)</a> by son chan uk (<a href='http://codepen.io/sculove'>@sculove</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

#### Browser API를 사용하여 캐로셀을 만든 예제

<iframe height='420' scrolling='no' src='//codepen.io/sculove/embed/qNGdWo/?height=420&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/sculove/pen/qNGdWo/'>flicking (none rxjs)</a> by son chan uk (<a href='http://codepen.io/sculove'>@sculove</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

### 캐로셀(flicking)의 동작 방식

비교에 앞서 캐로셀(flicking) 기능 구현을 위해 필요한 핵심 로직만 좀 살펴보자.

1. touchstart(mousedown) 발생 시

- 동작하고 있다는 표시(playing)을 한다. 그리고, 현재 선택 한 좌표(start)를 저장한다.

2. touchmove(mousemove) 발생 시

- playing 시에만 이벤트가 발생하고, touchstart(mousedown)에서 발생한 좌표를 기준으로 이동한 좌표(distance)를 구한다.
- 이동한 좌표 만큼 패널을 움직인다.

3. touchend(mouseup) 발생 시

- touchstart(mousedown)에서 발생한 좌표를 기준으로 이동한 좌표(distance)를 구한다. 이동한 좌표에 따라 애니메이션으로 판을 움직일지를 결정한다.
- 애니메이션으로 움직일 필요가 있을 경우, 애니메이션으로 판을 움직이고, playing 여부를 false로 지정한다.
- 판이 다음이나, 전 판으로 이동시, 순환을 위해 판의 좌표를 변경한다.

위에서 언급한 것처럼 간단한 기능이지만, 이벤트 흐름이 이렇게 동작할 거라고 이해를 해야만 개발을 할 수 있다. 또한 애니메이션 구현도 해야만 한다.

### 중요한 로직 비교

#### touchstart - touchmove - touchend 이벤트 처리

##### RxJS

touchstart이벤트 발생시, do로 작업을 하고, move 이벤트 발생시에는 start좌표와의 차이(distance)의 데이터로 변환하고, 이 데이터의 변경이 있을 경우, \_renderMove 함수로 실제 패널을 움직인다. 이 작업은 touchend 이벤트가 끝나는 순간까지 stream을 발생 하고, 이를 계속 반복한다.

```js
// change$
Rx.Observable.fromEvent(el, EVENTS.start)
  .map(getPos)
  .do((v) => {
    this.playing = true;
    this.startSubject.next(v);
  })
  .flatMap((v) =>
    Rx.Observable.combineLatest(
      this.startSubject,
      Rx.Observable.fromEvent(el, EVENTS.move).map(getPos),
      (s, m) => m - s
    )
  )
  .distinctUntilChanged()
  .do((v) => this._renderMove(v))
  .takeUntil(this.end$)
  .repeat()
  .subscribe();
```

##### Browser API

반면, RxJS를 사용하지 않은 코드는 데이터의 흐름을 코드만 보고 파악하기가 어렵다. 더불어, 별도의 변수(start, distance, ...) 값들을 유지하고, onEnd 이벤트 핸들러에서 변수를 초기화 해주는 작업도 해줘야한다.

```js
this.start = null;
this.distance = null;
this.onStart = el.addEventListener(EVENTS.start, (e) => {
  this.playing = true;
  this.start = getPos(e);
});
this.onMove = el.addEventListener(EVENTS.move, (e) => {
  if (this.start === null) return;
  let distance = getPos(e) - this.start;
  this.distance !== distance && this._renderMove(distance);
  this.distance = distance;
});
this.onEnd = el.addEventListener(EVENTS.end, (e) => {
  //...
  this.start = null;
  this.distance = null;
});
```

#### Animation 처리

##### RxJS

touchend(mouseup) 이벤트가 발생할 때에 end 좌표와 start시의 좌표. 그리고 이동할 거리 등을 기준으로 `from, to, duration 값`을 계산한다.
계산된 정보는 \_crateAnimation\$에 전달 되어, 실제 애니메이션이 동작한다.

```js
_createAnimation$(from, to, duration) {
  //...
  Rx.Observable.generate(
    performance.now(),
    x => x <= startTime + duration,
    x => performance.now(),
    x => (x-startTime)/duration,
    Rx.Scheduler.animationFrame
  )
  .map(p => from + (p * (next ? -distance: distance)))
  .concat(Rx.Observable.of(to))
  .distinctUntilChanged()
  .do(v => this._renderMove(v))
  .last()
  .do(v => {
    v !==0 && this._renderRearrange(next);
    this.playing = false;
  });
},
```

Observable.generater를 이용하여 애니메이션 좌표가 발생하고, 이 좌표에 따라, \_renderMove에 의해 실제 패널이 이동된다. 이 패널의 이동이 완료되면, 패널 이동 여부에 따라 \_renderRearrange에 의해 패널의 위치가 재정의 된다. 지금 느낄지 모르겠지만, 꽤나 선언적이다.

##### Browser API

RxJS와 마찬가지로 touchend(mouseup) 이벤트가 발생할 때에 end 좌표와 start시의 좌표. 그리고 이동할 거리 등을 기준으로 `from, to, duration 값`을 계산한다.
계산된 정보는 \_runAnimation에 전달 되어, 실제 애니메이션이 동작한다.

```js
_runAnimation(from, to, duration) {
  // ...
  let self = this;
  let startTime = performance.now();
  let p = 0;
  let pos;
  let beforePos = -1;
  (function animate () {
    let x = performance.now();
    if (x >= startTime + duration) {
      self._renderMove(to);
      to !==0 && self._renderRearrange(next);
      self.playing = false;
      return;
    }
    p = (x-startTime)/duration;
    pos = from + (p * (next ? -distance: distance));
    (beforePos !== pos) && self._renderMove(pos);
    beforePos = pos;
    window.requestAnimationFrame(animate);
  })();
}
```

RxJS를 사용하지 않는 다음 코드는 앞의 이벤트 보다는 흐름을 알지 못해도 이해하기 쉬운 반면, 값의 변경 여부 확인이나 중간값 계산을 위한 의미론 적으로 불필요한 변수들(beforePos, p, self,..)을 사용하게 된다.

### Front-End에서 RxJS는 필요한가?

우선 `코드량은 전체적으로 별차이가 없다.` 크롬 Timeline을 통해 애니메이션 프레임을 확인해 본 바로는 `속도도 별 차이가 없다.` 차이가 있다면, RxJS의 호출 스택이 좀 길다는 것 정도이다.
물론, PC에서 확인해서 그런지는 모르겠지만, 이건 RxJS를 사용하지 말아야하는 이유가 되지는 못할 것 같다.

단지 차이가 있다면 보다 선언적으로 프로그래밍이 된 정도? 일까?
RxJS의 이해도가 있는 사람은 `코드를 통해 의미를 찾을수 있다`는 장점이 있는 것 같다. 또한, 기본적으로 제공하는 좋은 operator가 있어서 좀 `지저분한 변수들이 없어지는 장점`도 있다. 하지만, `디버깅면에서는 좀 단점`인것 같다. `do` operator를 통해 확인하는 방법이 최선인것 같다.

지금 상황에서 RxJS 를 쓸거냐고 누군가가 물어본다면...
내 대답은 `실시간 채팅`이나 `실시간 SNS` 정도면 모를까. 지금의 웹서비스에 적합할 지는 모르겠다.

솔직히 지금은 내가 내공이 약해서 잘 모르겠다.
지금 짠 코드도 진짜 RxJS를 잘 활용한 것인지도 모르겠다.
암튼 더 관심을 가지고 봐야할 주제인 것 같긴하다 ^^;;
