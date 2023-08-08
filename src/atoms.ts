import { atom } from 'recoil'
// 컴포넌트를 어떻게 ATOM의 value로 연결하는지
// atom.ts를 생성해 value를 생성
// recoil사용시, 하나의 atom을 만들고 key, default값이 필요
export const isDarkAtom = atom({
  key: 'isDark',
  default: true,
})
// 그 어떤 컴포넌트에 대해서든, atoms는 독립적이다
// atoms의 값을 받을 수 있고, 값을 수정할 수 있다
