import 'styled-components'

// styled-components 라이브러리는 타입스크립트를 사용하는 프로젝트에서 사용자 정의 테마를 지원하기 위해 styled.d.ts와 같은 타입스크립트 선언 파일을 제공한다
// 아래의 코드는 DafaultTheme을 확장하여 사용자 정의 테마를 정의하는 것이다.
declare module 'stlyed-components' {
  export interface DefaultTheme {
    textColor: string
    bgColor: string
    accentColor: string
  }
}
