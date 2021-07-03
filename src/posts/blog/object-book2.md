---
title: 오브젝트 책에 대한 잡담 - 2
category: Tech
tags:
  - book
  - oop
  - 책임주도설계
  - 데이터중심설계
  - react
date: '2019-08-10 23:39:48'
thumbnail: ./images/object-book1/object.jpeg
---

요즘은 회사일이 바뻐서 점심시간을 쪼개고 쪼개서 스터디 아닌 스터디를 하고 있다.
1시간이 채 안되는 시간동안 이야기를 했지만, 그래도 꽤 재미있는 이야기들이 오고가서 잠담이라고 치부하기에는 아까운 내용들이다.

이 글은 Object 책의 두번째 모임의 후기로 책 3~4장에 대한 내용을 토대로 이야기했던 내용과 내가 생각했던 내용들을 정리했다.

![](./images/object-book2/object.jpeg)

## 역할, 책임, 협력

이 책이 새롭지 않으면서도 새로운 이유는 그동안 익히 알고 있었던 똑같은 내용을 다른 시각으로 바라보게 해준다는 것이다.  
꼰대(?) FE 개발자들이 읽기에 충분히 흥미로운 내용이었다.  
이 책에서는 주구장창 `역할`, `책임`, `협력`에 대해 이야기하고 있다.

이를 요약하면 다음 같이 이야기할 수 있다.

> `협력`은 `메시지`를 주고 받는 객체들의 상호작용이고,  
> `책임`은 협력하기 위해하는 `행동`이다.  
> `역할`은 대체 가능한 책임들의 집합이다.

이 말을 조금 더 생활형으로 표현하면...

> 나 당신과 해결할 게 있는데...(`협력`)  
> 나는 잘 모르겠고 그것 책임지고 해결하는 곳이 어디야? (`책임`)  
> 1588-XXXX으로 전화하면 되는거야? 전화만 하면 상담원A든 B든 해결해 주는 거지? 오케이. 고마워 (`역할`)

## 뭣이 중한디...

이 책을 읽다보면... 그래 협력도 중요하고 책임도 중요하고 역할도 중요해. 그런데.. 다 중요하면 설계할 때 3가지의 가치가 상충될 때는 어떻게 하지?

꼭 성경책에서 다 중요하다고 이야기하는 것처럼 이 책에서도 다 중요하다 이야기하고 있자너!  
하지만, 저자는 분명히 이야기하고 있다.

> 믿음, 소망, 사랑, 그 중에 제일은 사랑이듯이  
> 협력, 책임, 역할. 그 중에 제일은 `책임`이다.

![](./images/object-book2/love.jpg)

라고...  
물론 약간의 각색을 한 것이지만 다른 무엇보다도 `책임`을 어떻게 객체에 부여할 것인지에 대해 가치를 두는게 더 중요하다고 이야기하고 있다.

## 데이터 중심의 설계의 문제점

4장에서는 데이터 중심의 설계 방식과 책임주도설계 방식을 코드로 비교하면서 설명을 해준다.
꼰대(?) FE 개발자들이 가장 재미있게 본 장이고 그리고 가장 논의의 중심이 된 장이었다.
저자는 데이터 중심의 설계의 문제점이

- 너무 이른 시기에 데이터에 관한 결정을 강요당하고
- 협력을 고려하지 않고 객체 자체를 고립시킨체 인터페이스를 정의하도록 하기 때문이라고 이야기한다.

### 데이터...데이터...

이 책에서는 데이터 중심의 설계는 생각부터 무슨 데이터가 쓰이지를 생각하기 때문에 기본적으로 캡슐화를 염두에 두지 못하고 자꾸 데이터만 늘리게되어 결합도를 높이고 응집도를 떨어뜨린다고 이야기한다.

정말로 그러한가?  
맞다.

우리가 개발할 때 하는 흔한 실수 중의 하나가 캡슐화를 한답시고 어설푸게 데이터 속성의 캡슐화를 해서 졸라게 많은 get/set 메소드를 만들게 된다.

왜? 데이터 중심으로 보고 있지만... 캡슐화에 대해 배운거는 있어서 해야하니깐... ㅋㅋ  
이 책에서는 협력 관점에서 필요한것 만 노출하게 하고 내부의 속성이 외부 인터페이스에 의해 추측될 수 있는 형태도 좋지 않다고 이야기한다.

한 마디로.

> 내부 구현의 변경으로 외부의 객체가 영향을 받는 경우라면 캡슐화 위반이다.

라고 이야기 하고 있다.

### 앞으로 쓸 것 같아요.

또한, 데이터 중심으로 보게 될때의 문제점으로 개발할 때 추측에 의한 설계를 하게 된단다.  
해서 앞으로 필요할것 같은 메소드, 속성들을 추가해놓게 된다.

개발할때 가장 흔하게 빠지는 유혹 중에 하나가 바로 `추측에 의한 설계`이다.  
생각해보면... 이런 속성. 저런 메소드가 쓰일 것 같아서 개발했어요. 하는 사람들이 많다.

![](./images/object-book2/guess.jpg)

참 대견하다. 하나만 하면 될 것을 스스로 열개를 하다니 정말 훌륭하다.  
하지만... 개인적으로는 안했으면 좋겠다.  
우선 필요가 없는 것을 만드는 것.  
**특히 외부로 노출되는 인터페이스의 경우에는 하지 않는게 좋다.**

왜?  
확실한 요구사항 없이 만들어 놓은 코드는 당신의 퇴근시간을 늦출 것이고,  
당신의 동료가 유지보수해야할 코드의 대상이 늘어날 뿐이다.

> 제발 추측해서 만들지 말자.

저자는 이와 같은 상황을 두고 협력을 고려하지 않고 객체 자체를 고립시켜서 생각하기 때문에 발생한다고 한다.

## UI와 데이터의 운명적인 만남

그런데 문제는...UI 개발은 필연적으로 데이터를 먼저 보게 된다는 것이다.  
UI개발은 시작부터 `어떤 데이터가 화면에서 쓰이지?`부터 시작한다.  
그 유명한 React와 같은 라이브러리도 `상태기반의 개발`을 이야기한다.  
이 말만 들으면 FE 개발은 천상 객체지향 패러다임에 맞게 개발하기는 틀려먹은 것 처럼 보인다.

이에 대한 나의 대답은 `아니다`.

> UI 개발도 화면 중심으로 개발을 하지만 화면에서 사용될 각각의 **UI객체와의 협력과 책임 그리고 역할을 고려하여 개발하는게 맞다.**

물론 방법은 조금 다르다고 생각한다.  
FE개발에 적합한 방법과 패러다임이 있기에 이 부분은 별도의 글에서 다루도록 하겠다.