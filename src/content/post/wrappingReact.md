---
title: React로 레거시(?) 코드 랩핑하기
category: Tech
thumbnail: ./images/wrappingReact/react-lifecycle.png
tags:
  - react
  - legacy
  - egjs
  - infinitegrid
  - wrapping
date: '2017-11-21 23:41:50'
---

기존에 작성한 또는 DOM 기반으로 작성한 코드를 React나 Angular, Vue와 같은 프레임워크에서 사용하고 싶은 경우가 많다.  
물론, `기존 코드의 내용은 하나도 안고치고 사용하고자 한다.`
그래서 일반적으로 기존 코드를 사용하는(랩핑) 프레임워크의 컴포넌트를 만들게 된다.

JQuery plugin을 React로 랩핑하는 것은 [아티클](http://tech.oyster.com/using-react-and-jquery-together/)에 나온 것 처럼 의외로 간단하다.
하지만, DOM을 주무르듯이 계속 만져(?)주는 컴포넌트인 경우는 처음부터 상태기반으로 컴포넌트를 설계하지 않는 이상 React/Angular/Vue에 맞는 컴포넌트를 맞추는 것은 쉽지 않다.
생각 같아서는 native한 코드를 작성해서 사용하고,
이를 각 프레임워크 스타일로 랩핑만 하면 간단히 될거라고 생각했는데 만들고 보니 꽤나 부자연스러웠다.

내가 주로 만들고 있는 것들이 UI 컴포넌트인데 복잡한 UI 컴포넌트는 사실 프레임워크와 엮는게 쉽지 않다.
지금 작업하고 있는게 [InfiniteGrid](https://github.com/naver/egjs-infinitegrid)라는 컴포넌트이다.
이 컴포넌트는 꽤나 빈번하게 DOM을 조작하고 내부적으로 상태를 관리하고 있기 때문에 더욱 그러한 것 같다.  
이것과 관련해서 했던 `삽질`과 약간의 `꽁수`를 찾게 되어 몇자 끄적여 본다.

<!-- more -->

## InfiniteGrid

사용자가 스크롤을 계속 할수록 컨텐츠는 무한으로 추가되고,
DOM의 개수는 화면사이즈에 맞게 동적으로 DOM을 제거하는 모듈이다.
한 마디로 `DOM 밑장 빼기` 기술이다. 이론은 간단하지만, 실제로는 고민할 거리가 꽤 많다.
더군다나 InfiniteGrid는 카드를 다양한 형태로 배치가 가능하니 더 복잡하다.
하지만 이 글은 이에 대한 내용이 아니니 과감히 생략하고 본론으로 이야기해보자.

이 컴포넌트의 형태는 다음과 같다.

```js
// 특정 엘리먼트 기준으로 인스턴스를 생성한다.
const infinite = new InfinieGrid(element, options);

// 이벤트를 통해 특정 시점을 전달받는다.
infinite.on('append', () => {});

// 메소드를 통해 제어한다.
infinite.setLayout(GridLayout, options);
infinite.append(items);
```

> 메소드를 통해 인스턴스에 데이터를 전달하거나 얻고, 이벤트를 통해 시점을 전달받는다.
> 인스턴스를 생성할 때는 옵션을 받아 제어할 정보를 전달받는다.

React는 상위컴포넌트에서 하위컴포넌트로 데이터를 prop를 통해 단방향으로 전달하기 때문에 다음과 같이 간단한 형태의 React Component를 만들 수 있다.

```jsx
<InfiniteGrid
  layout={ 
    { 
      class: GridLayout, 
      options: { margin: 10 } 
    } 
  }
  options={ 
    { isOverflowScroll: true } 
  }
  onAppend={this.onAppend.bind(this)}
  append={this.state.items}
  // ...
/>
```

옵션(options)과 메소드(append), 이벤트(OnAppend) 모두 prop로 전달해주면 된다.
이벤트는 핸들러에서 `setState`를 이용하여 상태를 다시 상위로 전파 시키면 양방향으로 데이터 전달이 가능하다.

하지만 문제는 React는 prop가 변경되거나 내부 state가 변경되면 `다시 그린다(물론 비교는 한다)`는 것이다.
애써 DOM을 순환형태로 구성하면 다시 그려버리는 것이다. ㅠㅠ

## 첫번째 꽁수! React. DOM 처리는 내가할께.

React 컴포넌트는 라이프 사이클이 있어서 초기에 render 함수가 호출 된 이후, prop나 state가 변경되면 shouldComponentUpdate가 발생하고 그 반환값이 `true`이면 render를 호출한다.

![](./images/wrappingReact/react-lifecycle.png)

이렇게 DOM을 React Component가 아닌 내부(egjs의 infiniteGrid)에서 다룬다면, shouldComponentUpdate의 반환값을 `false`로 바꾸면 초기 로딩 이후 render를 호출하지 않는다.

```js
shouldComponentUpdate() {
  return false;
}
```

React는 껍데기일뿐 DOM을 그리는 것은 infiniteGrid가 직접 그리게 된다.
으하하하~!

## 두번째 꽁수! React 컴포넌트도 마크업으로 뿅!

native로 작성한 infiniteGrid 코드에서는 append나 prepend를 이용하여 `HTML string`이나 `HTMLElement 배열`, 또는 `jQuery 인스턴스`를 데이터로 받는다.
https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.html#append

```js
infnite.append(['<div>아이템1</div>', '<div>아이템2</div>']);
```

하지만, React에서는 가급적이면 React 컴포넌트를 아이템으로 받고자 한다.
React 컴포넌트를 아이템으로 사용하기 위해서는 내부 코드를 바꾸고 React 컴포넌트 여부를 파악 후에 별도로 render를 부르고, 어쩌고 저쩌고 하면...된다.

**그런데 기존 코드를 건드리지 않고 할 수 있는 방법이 있을까?**

여기서 찾은 두번째 꽁수는 React 컴포넌트를 받아서 `string 배열`로 만드는 방법이다.
가장 쉬운 방법은 [ReactDOMServer.renderToStaticMarkup](https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup)를 이용하여 React 컴포넌트를 string 형태로 만들 수 있다.

```js
const stringInArray = items.map((v) => ReactDOMServer.renderToStaticMarkup(v));
```

야호! 이제 React 컴포넌트도 사용할수 있게 되었다.

## 랩핑의 한계

**껍데기만 React 컴포넌트인 아이템들**

하지만. 이렇게 만들면 문제는 `ReactDOMServer.renderToStaticMarkup` 함수에 의해 변경된 React 컴포넌트는 string으로만 변경되기 때문에 해당 React 컴포넌트에서 처리한 이벤트 핸들러 같은 것은 사라져 버린다. ㅠㅠ  
실무에서는 아이템 상위 요소인 InfiniteGrid에 click 이벤트를 delegate해서 처리하긴 했지만...
꽤나 찝찝하다. 쩝쩝.

**내부에서 상태관리를 하는 경우라면... 뭐... 방법이 없네.**

앞에서 DOM 관리를 native infiniteGrid에서 하기 위해서는 shouldComponentUpdate로 render를 제어 할수 있다.
하지만, `내부에서 상태관리를 하는 경우에 대해서는 마땅한 방법이 없다.`
native infiniteGrid도 내부에서 자체적으로 2개의 상태를 관리한다. 실제 리스트의 내용과 화면에 보여지는 일정한 개수의 리스트를 가지고 있다. 이를 고치려면 근본적으로 infiniteGrid의 상태를 외부에서 주입하는 방식으로 변경해야만 한다.
infiniteGrid와 같이 append, prepend와 같은 메소드가 아니라 항상 상태에 따라 데이터가 변경될 수 있도록 변경해야한다.
그렇지 않는다면, 궁극적으로 상태는 React로 랩핑한 컴포넌트와 랩핑된 native 컴포넌트 둘 다 가지고 있게 될 뿐만아니라 상태 변경 상태에 대한 별도의 sync 작업도 해주어야한다.

만약 상태값을 전달하지 않고 append/prepnd와 같은 메소드의 인자로 데이터를 전달하는 방식으로 개발을 한다면 `외부에서 변경여부에 따라 변경된 부분(추가할거나 삭제할것)을 구분해서 랩핑한 react 컴포넌트에 전달해야만 한다.`  
react스럽지 않은 부자연스러움이 아주 많~이 느껴진다 ㅠㅠ

```js
componentWillReceiveProps({append}) {
  // ...
  // 랩핑된 컴포넌트의 append prop로 변경될(추가될) 아이템만을 넘겨주어야한다.
  const elements = append.map(v => ReactDOMServer.renderToStaticMarkup(v));
  this._instance.append(elements);
  // ...
}
```

## 결론

이 글을 쓴 진짜 이유는 나같은 사람이 발생하지 않길 바라는 의미이다.  
기존의 DOM 제어 방식의 개발을 단순히 스타일만 바꾼다고 각 프레임워크에 맞는 컴포넌트가 되지는 않는다.
간단한 기능이라면 위에서 언급한 `꽁수` 들로 랩핑만으로 충분하겠지만.  
꽁수는 꽁수일뿐. 해결책은 아니다.

**내부적으로 상태를 관리하는 native 컴포넌트라면 랩핑보다는 state에 적합한 구조로 재개발을 하는게 장기적으로 더 좋은 결과를 얻을수 있을것 같다.**

> 참고: 개인적으로는 Angular를 기반으로 이야기하고 싶지만, 현실은 React를 더 많이 사용하기에 React를 만들게 되었다. 내가 React를 만들면서 이런 고민을 하게 될 줄이야. ㅜㅜ
>
> 사실 React나 Angular나 Vue나 기능적인 면에서는 다 거기서 거기다. (사실 vue는 잘모름)  
> 모두 `상태 기반`을 지향하기 때문에 만들어가는 방식도 유사하고 데이터 흐름제어도 유사하다.
> 따라서 이 글에서는 React를 기준으로 이야기했지만 다른 프레임워크의 랩핑 컴포넌트를 만들때도 비슷한 고민을 하게된다. 또한 처리 방식도 비슷하다.
