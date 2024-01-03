# Nuxt 3 Study

## Nuxt 3 사용 경혐과 SSR 환경에서의 프론트엔드 이해 학습

### Nuxt 3

Vue 버전이 3로 올라감으로써 Vue 기반 프레임워크인 Nuxt 도 Vue 버전에 맞춰 3로 업그레이드 되었다. Nuxt 2에서 친숙하게 사용했던 API들의 형태는 많이 바뀌지 않았으나 Vue 3에서 많은 것들이 변경되어 그에 맞춰 적용된 사항이 많으므로 색다르게 느껴지는 부분도 있었다. 예를 들어, `serverMiddelware` 기능, `layout` 기능, `pages` 디렉토리에 `.vue` 파일 작성시 알아서 페이지 컴포넌트로 만들어주는 작업 등 굵직한 기능은 유지하고, 내부적인 동작이 많이 변경된 것으로 보인다.

- Vue 3 환경에서는 기본 개발 툴로 Vite 베이스를 추천하는데, Nuxt도 마찬가지로 프로젝트 생성시 Vite를 기본적으로 지원한다. 기본적으로 SSR을 지원하기 위해 컴포넌트를 빌드하는 것 외에 렌더링에 필요한 서버측 빌드가 Nuxt 2 에서 퍼포먼스적으로 아쉬운 부분이 있었는데, Vite 도입 및 내부 개선으로 이 부분이 크게 개선이 된 것 같다.
- SSR
  - 옛날 방식인 서버 사이드 렌더링 기술
    - 서버 사이드 렌더링 기술은 서버에서 HTML을 만들어 완성된 HTML을 브라우저에 내려준다고 볼 수 있다. 전통적인 관점에서 보면 각 경로에 대응되는 HTML을 매번 새로고쳐서 내려준다. 네비게이션상 메뉴 이동해도 새 HTML이 그려져야 한다면 메뉴 이동시에도 새로 HTML을 그려준다.
  - 비교적 최신의 서버 사이드 렌더링 기술
    - 옛날 방식과 비교해 요즘에는 서버 사이드 렌더링 기술에서 HTML을 그려낼 때에도 React, Vue 같은 프론트엔드 프레임워크가 사용된다. 따라서 서버 사이드에서 프레임워크가 처리할 수 있는 컴포넌트(JSX 등)를 해석하고 HTML을 그려내어 브라우저에 전송한다. 이 경우 서버 사이드에서는 HTML의 이벤트라던지 특정 클라이언트 사이드에서만 수행할 수 있는 일부 기능들은 아직 동작하지 않는 상태이다. 그렇다면 이러한 과정들은 언제 처리되는 걸까? 이렇게, 서버 사이드에서 내려준 HTML에 클라이언트 사이드에서만 할 수 있는 일부 처리를 해주는 과정을 "하이드레이션"이라고 한다.
    - 또 하나의 다른 점은 첫 렌더링만 서버 사이드에서 렌더링하여 HTML이 채워지고, 그 후 부터는 CSR 방식으로 동작한다. 따라서 첫 렌더링 후 SPA처럼 동작하기에 많은 서버 사이드 렌더링 프레임워크들이 자신들이 하는 렌더링이 서버 사이드 렌더링이 아니라 Universal Rendering 혹은 Isomorphic rendering 이라고 칭하는 이유가 바로 그것이다.
  - 하이드레이션
    - 최신의 서버 사이드 렌더링 기술에서 Universal Rendering 이라고 언급했던 부분이 있는데, 이 부분과 연관있는 개념 중 하나가 하이드레이션이라는 개념이다. 과거의 서버 사이드 렌더링 기술은 매 페이지마다 HTML을 다시 그려내고, 클라이언트 사이드에서 필요한 자바스크립트 파일을 내려 스크립트와 같이 내려보내면 클라이언트에서 스크립트가 실행되는 구조이다. 반면 프론트엔드 프레임워크를 활용한 서버 사이드 렌더링 기술은 서버와 클라이언트측 자바스크립트가 동일하게 실행될 수 있으므로 프레임워크에서 렌더링한 HTML이 클라이언트측에서도 유효할 수 있도록 설계해야한다. 사전적 의미로는 수화, 수분을 공급하다. 라는 느낌의 영단어이다. 서버측에서는 프론트엔드 코드를 가지고 프레임워크에서 제공하는(혹은 자체 개발한) 서버 렌더링 API를 활용해서 HTML을 만들어낸다. 이 HTML은 단순히 AST로부터 추출한 문자열 덩어리일 수 있다. 서버측에서는 브라우저 API를 이용할 수 없으므로 렌더링된 HTML의 각 엘리먼트에 이벤트를 거는 등의 행위를 취할 수 없다. 따라서 서버측에서는 프론트엔드 코드를 서버에서 HTML로 렌더링하고, 클라이언트에서 렌더링된 HTML을 가지고 VDOM을 메모리에 등록시키거나, 이벤트를 연결하는 등의 작업을 할 수 있다. 이 행위를 하이드레이션이라고 한다. 모든 내용은 서버와 클라이언트 "양측에서 모두 렌더링이 일어난다."를 전제로 한다.

### Typescript

[유저 스토어](./src/store/user.ts)에서 사용한 상태 관리 패턴과 [템플릿 스토어](./src/store/template.ts)에서 사용한 상태 관리 패턴이 서로 다른데, 유저 스토어에서 사용한 방식은 기존 Vuex에서 사용했던 상태 관리 패턴으로, 그저 값을 리턴하는 함수를 제공하는 방식이고, Composition API와 친숙한 방법으로 `ref`, `computed` 등으로 반응형 객체 그대로를 리턴하는 방식을 사용할 수 있는데, 후자의 방법이 매끄럽고 사용하기 좋은 것 같다. 후자의 경우 따로 타이핑 하지 않아도 정상적인 흐름으로 타입 추론을 할 수 있도록 제공한다.

### 기술 스택

- Nuxt 3.8.2 (Vue 3.3.8)
- Firebase
- Tailwindcss
