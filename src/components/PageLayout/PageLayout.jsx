import styled from '@emotion/styled';
import { Loader } from 'components/Loader/Loader';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const PageLayout = () => {
  return (
    <>
      <Header>
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/movies">Movies</HeaderLink>
      </Header>
      <Container>
        <Suspense fallback={Loader}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};

const HeaderLink = styled(NavLink)`
  display: inline-block;
  padding: 8px;
  color: #21130d;
  text-decoration: none;
  border-radius: 8px;
  background-color: #cdb896;

  &.active,
  &:hover {
    background-color: #873e23;
  }
`;

const Header = styled.nav`
  display: flex;
  gap: 12px;
  padding: 12px 30px;

  margin-bottom: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const Container = styled.div`
  padding-left: 30px;
  padding-right: 30px;
`;
