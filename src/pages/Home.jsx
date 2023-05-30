import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from 'services/request';

export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const setData = async () => {
      try {
        const data = await getTrendingMovies();
        setTrendingMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    setData();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {trendingMovies.map(({ id, title, name }) => (
          <StyledItem key={id}>
            <Link to={`/movies/${id}`}>{title ?? name}</Link>
          </StyledItem>
        ))}
      </ul>
    </div>
  );
};

export const StyledItem = styled.li`
  display: block;
  padding: 8px;
  margin-bottom: 12px;
  max-width: fit-content;

  background-color: #873e23;
  color: #cdb896;
  text-decoration: none;
  border-radius: 8px;

  a {
    text-decoration: none;
    color: #cdb896;

    &:hover {
      color: black;
    }
  }
`;
