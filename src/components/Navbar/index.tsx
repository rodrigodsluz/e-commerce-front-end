import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons/lib';
import { signout, isAuthenticated } from '../../api/auth';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
  TextMenu,
  SignoutBtn,
  CartBadge,
} from './styles';
import { Button } from '../../styles/global';
import { itemTotal } from '../../api/apiCart';

const Navbar = () => {
  const router = useRouter();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', showButton);
  });

  const isActive = path => {
    if (router.pathname === path) {
      return { color: 'red' };
    }
  };
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavbarContainer>
            <Link href="/">
              <NavLogo>
                <NavIcon />
                <TextMenu>Lifeasier</TextMenu>
              </NavLogo>
            </Link>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} /* click={click} */>
              <NavItem>
                <Link href="/">
                  <NavLinks onClick={closeMobileMenu}>
                    <TextMenu style={isActive('/')}>Home</TextMenu>
                  </NavLinks>
                </Link>
              </NavItem>

              <NavItem>
                <Link href="/shop">
                  <NavLinks onClick={closeMobileMenu}>
                    <TextMenu style={isActive('/shop')}>Shop</TextMenu>
                  </NavLinks>
                </Link>
              </NavItem>

              <NavItem>
                <Link href="/cart">
                  <NavLinks onClick={closeMobileMenu}>
                    <TextMenu style={isActive('/cart')}>
                      Cart
                      <sup>
                        <CartBadge>{itemTotal()}</CartBadge>{' '}
                      </sup>
                    </TextMenu>
                  </NavLinks>
                </Link>
              </NavItem>

              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <NavItem>
                  <Link
                    href={isAuthenticated() ? '/user/dashboard' : '/signin'}
                  >
                    <NavLinks onClick={closeMobileMenu}>
                      <TextMenu style={isActive('/user/dashboard')}>
                        Dashboard
                      </TextMenu>
                    </NavLinks>
                  </Link>
                </NavItem>
              )}

              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <NavItem>
                  <Link
                    href={isAuthenticated() ? '/admin/dashboard' : '/signin'}
                  >
                    <NavLinks onClick={closeMobileMenu}>
                      <TextMenu style={isActive('/admin/dashboard')}>
                        Dashboard
                      </TextMenu>
                    </NavLinks>
                  </Link>
                </NavItem>
              )}

              {!isAuthenticated() && (
                <>
                  <NavItem>
                    <Link href="/signin">
                      <NavLinks onClick={closeMobileMenu}>
                        <TextMenu style={isActive('/signin')}>Signin</TextMenu>
                      </NavLinks>
                    </Link>
                  </NavItem>

                  <NavItemBtn>
                    {button ? (
                      <Link href="/signup">
                        <NavBtnLink>
                          <Button style={isActive('/signup')} primary>
                            SIGN UP
                          </Button>
                        </NavBtnLink>
                      </Link>
                    ) : (
                      <Link href="/signup">
                        <NavBtnLink>
                          <Button
                            style={isActive('/signup')}
                            onClick={closeMobileMenu}
                            fontBig
                            primary
                          >
                            SIGN UP
                          </Button>
                        </NavBtnLink>
                      </Link>
                    )}
                  </NavItemBtn>
                </>
              )}

              {isAuthenticated() && (
                <NavItem>
                  <SignoutBtn
                    onClick={() =>
                      signout(() => {
                      router.push('/');
                    })
                    }
                  >
                    <TextMenu style={{ cursor: 'pointer', color: '#fff' }}>
                      Signout
                    </TextMenu>
                  </SignoutBtn>
                </NavItem>
              )}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
