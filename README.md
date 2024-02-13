## crypto project

### 💡프로젝트 설명
암호화폐 추적기입니다.
암호화폐 데이터를 받아와서 차트를 통해 가격 추이를 알아보는 프로젝트입니다.

### ⚒️기술 스택 
HTML&CSS, React, TypeScript

### 💻구현 기능
- 다크/라이트 모드 구현
- 뒤로가기 버튼 구현
- react-apexcharts를 사용하여 차트 구현
- Recoil/Atom: useSetRecoilState, useRecoilState와 같은 훅을 이용하여 코인 데이터 값을 조작하고 가져왔다.
    (useState같은 경우 컴포넌트 내에서만 상태를 관리한다.)
- React Helmet: 동적인 페이지 제목을 설정하였다.
- React Query: useState, useEffect를 사용하지 않고 React Query를 사용하여 api호출을 단순화하고, 데이터를 최신 상태로 유지했다.
    (React Query가 데이터를 캐시에 저장해두기 때문에(매번 api에 접근하지 않아도 됨) 각 코인을 클릭해서 정보를 확인하고 뒤로가기를 해도 로딩이 발생하지 않는다.)
- React Router Dom: 페이지 간의 동적 라우팅을 구현했다. (useParams데이터 값, useLocation상태정보 값, useMatch위치 유무 등)
- Styled-components: 각 컴포넌트의 스타일을 정의하고 유지보수가 용이하도록 관리하였다.

![스크린샷 2024-02-13 오후 3 32 25](https://github.com/winterkang/crypto-project/assets/111983968/960768cf-7b64-459a-ab82-c98ebe9de745)
![스크린샷 2024-02-13 오후 3 32 40](https://github.com/winterkang/crypto-project/assets/111983968/d0132a9d-b711-4c91-bc8a-f4db969a16a6)


### ✏️회고
리액트의 큰 흐름(페이지 전환, 상태관리 등)을 파악하기에는 좋았지만,
강의를 통해 배우면서 진행한 프로젝트이기 때문에 코드의 참고가 많았다는 점이 아쉽다.


