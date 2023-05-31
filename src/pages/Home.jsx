import { StyledItem } from 'components/Styled';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  const location = useLocation();

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {trendingMovies.map(({ id, title, name }) => (
          <StyledItem key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {title ?? name}
            </Link>
          </StyledItem>
        ))}
      </ul>
    </div>
  );
};

export default Home;
