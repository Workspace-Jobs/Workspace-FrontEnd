import Link from 'next/link'
import * as S from './style'
import * as SVG from 'assets/svg'
import { useRouter } from 'next/router'
import { getUserInfo } from 'api/member'
import { useEffect, useState } from 'react'
import { isLogin } from 'utils/isLogin'
import Image from 'next/image'
import { getImgUrl } from 'utils/getImgUrl'
import { useSetRecoilState } from 'recoil'
import { isLoginValue } from 'Atoms/recoilAtom'

const Header = () => {
  const router = useRouter()
  const path = router.pathname
  const [userName, setUserName] = useState('')
  const [userImg, setUserImg] = useState('')
  const setLogin = useSetRecoilState(isLoginValue)

  useEffect(() => {
    isLogin().then((res) => {
      if (!res) return setLogin(false)
      if (res) {
        getUserInfo().then((res) => {
          console.log(res?.data)
          setUserName(res?.data.username)
          setUserImg(getImgUrl(res?.data.profile))
          setLogin(true)
        })
      }
    })
  }, [])

  return (
    <S.Header>
      <S.HeaderWrapper>
        <Link href="/">
          <SVG.WorkspaceLogo2 />
        </Link>
        <S.MenuWrapper>
          <Link href="/employment" passHref>
            <S.Menu state={`${path === '/employment'}`}>채용정보</S.Menu>
          </Link>
          <Link href="/community" passHref>
            <S.Menu state={`${path === '/community'}`}>커뮤니티</S.Menu>
          </Link>
          <Link href="/resume" passHref>
            <S.Menu state={`${path === '/resume'}`}>이력서</S.Menu>
          </Link>
        </S.MenuWrapper>
        <S.UserInfo>
          <SVG.SearchIcon />
          {userName !== '' ? (
            <div onClick={() => router.push('/my')}>
              <S.ProfilImg>
                <Image
                  alt="Thumbnail img"
                  src={userImg}
                  sizes="100%"
                  layout="fill"
                  priority={true}
                />
              </S.ProfilImg>
              {userName}
            </div>
          ) : (
            <Link href={'/auth/signup'}>
              <p>회원가입/로그인</p>
            </Link>
          )}
        </S.UserInfo>
      </S.HeaderWrapper>
    </S.Header>
  )
}

export default Header
