import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchCoins } from './api'
import { Helmet } from 'react-helmet'
import { useSetRecoilState } from 'recoil'
import { isDarkAtom } from '../atoms'
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const CoinList = styled.ul``

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  // Link가 아니라 a인 이유: 콘솔창을 열어보면 Link가 a태그로 나타나기 때문
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`
const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`
const Loader = styled.span`
  text-align: center;
  display: block;
`
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`
// Api로 받아오는 데이터(Coin)의 타입이 무엇인지 명시해야한다
interface ICoin {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}
interface ICoinsProps {}
const Coins = () => {
  // value를 가져오는 것이 아니라 수정!
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom(prev => !prev)
  // isLoading은 loading state를 대신하여 true, false를 반환
  // useQuery훅이 fetcher함수 fetchCoins를 불러오고
  // fetcher함수가 isLoading이라면 react query가 알려주고
  // useQuery가 fetcher함수를 부르로 fetcher함수가 끝났다면 react query는 api.ts의 json을 data에 넣음
  // 각 코인을 클릭해서 정보를 확인하고 뒤로가기를 해도 로딩이 발생하지 않는데 이는 react query가 데이터를 캐시에 저장해두기 떄문
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins)
  // console.log({ isLoading, data })
  // 아래의 코드를 react query를 사용하면 훨씬 간편해진다.
  // const [coins, setCoins] = useState<CoinInterface[]>([])
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   ;(async () => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins')
  //     const json = await response.json()
  //     setCoins(json.slice(0, 100))
  //     // 데이터가 로드되면 로딩 상태를 false로 바꿔주기
  //     setLoading(false)
  //   })()
  // }, [])
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Button</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {/* 가져올 코인 개수 지정 slice */}
          {data?.slice(0, 100).map(coin => (
            <Coin key={coin.id}>
              <Link
                // pathname은 이동할 URL의 경로를 지정
                to={{
                  pathname: `/${coin.id}`,
                }}
                // state는 이동할 URL과 함께 전달할 상태 정보를 설정
                state={{ name: coin.name, rank: coin.rank }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  )
}

export default Coins
