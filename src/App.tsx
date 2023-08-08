import Router from './routes/Router'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HelmetProvider } from 'react-helmet-async'
import { darkTheme, lightTheme } from './theme'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from './atoms'
// 일반적으로 브라우저마다 기본적인 스타일이 다르기 때문에, 개발할 때 모든 브라우저에서 동일한 스타일을 보장하기 위해 초기화
// 모든 컴포넌트에 일관된 스타일을 적용하여 스타일 관련 코드를 중복해서 작성할 필요가 없고, 유지보수가 편리해진다
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${props => props.theme.bgColor};
  color:${props => props.theme.textColor}
}
a {
  text-decoration:none;
  color:inherit;
}
`

function App() {
  // value를 가져옴
  const isDark = useRecoilValue(isDarkAtom)
  return (
    <>
      <HelmetProvider>
        {/* index.tsx에 있던 theme을 App으로 가져와서 state로 관리하여 다크모드/라이트모드 구현 */}
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          {/* <button onClick={toggleDark}>Toggle Mode</button> */}
          <GlobalStyle />
          {/* App컴포넌트에서 isDark, toggleDark를 다른 컴포넌트에 전달 */}
          <Router />
          {/* react query의 상태와 요청들을 모니터링하고 디버깅하는 데 사용됨 */}
          {/* 쿼리, 뮤테이션들의 실행상태, 캐시된 데이터, 에러들을 살펴볼 수 있다 */}
          {/* initialIsOpen={true}는 ReactQueryDevtools를 화면에 표시할 때 초기 상태로 열려있도록 설정하는 것을 의미 */}
          {/* 기본값이 닫혀있는 상태로 시작하는데 사용자가 필요할 때만 개발 도구를 열어서 확인 할 수 있다. 하지만 true라면 개발 도구가 초기에 열린 상태로 시작한다 */}
          {/* 이를 통해 개발자들은 개발환경에서 즉시 react query의 동작으로 모니터링하고 디버깅하는데 도움을 얻을 수 있다. */}
          <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
      </HelmetProvider>
    </>
  )
}

export default App

// global state: 어플리케이션 전체에서 공유되는 state
// 예) 다크모드/라이트모드, 로그인 정보를 전역에서 유지(로그인 한 유저만 정보를 볼 수 있도록)
// App(isDark, toggleDarkFn)
// -> Router -> Coins (toggleDarkFn)
// -> Router -> Coin -> Chart (isDark)

// state management: Recoil: local state
// 부모가 자식에게 prop을 내려주는 계층 구조 대신에
// state를 atom(bubble)안에 넣고 컴포넌트가 바로 접근 할 수 있도록
// App -> (isDark) <- Chart

// 항상 local state가 필요한 것은 아니다. 두 개 이상의 컴포넌트에서 props를 필요로 할 때 사용하기
