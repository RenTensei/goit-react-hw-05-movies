import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieInfo } from 'services/request';
import { Loader } from 'components/Loader/Loader';
import { StyledItem } from 'components/Styled';

const MovieDetails = () => {
  const [title, setTitle] = useState('');
  const [userScore, setUserScore] = useState('');
  const [overview, setOverview] = useState('');
  const [genres, setGenres] = useState([]);
  const [imageLink, setImageLink] = useState('');

  const locationRef = useRef(useLocation());

  const { movieId } = useParams();

  useEffect(() => {
    const setData = async () => {
      try {
        const data = await getMovieInfo(movieId);

        const originalTitle = data?.original_title;
        const releaseYear = data?.release_date.split('-')[0];
        const userScorePercentage = Math.round(data?.vote_average * 10);

        setTitle(`${originalTitle} (${releaseYear})`);
        setUserScore(userScorePercentage);
        setOverview(data?.overview);
        setGenres(data?.genres);
        setImageLink(data?.poster_path);
      } catch (error) {
        console.log(error);
      }
    };

    setData();
  }, [movieId]);

  return (
    <div>
      <StyledItem>
        <Link to={locationRef.current.state?.from ?? '/movies'}>← Go Back</Link>
      </StyledItem>
      <div style={{ display: 'flex', gap: '20px' }}>
        <img
          src={`https://image.tmdb.org/t/p/original${imageLink}`}
          alt={title}
          width="250"
        />
        <div>
          <h2>{title}</h2>
          <p>User Score: {userScore}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <ul style={{ display: 'flex', gap: '20px' }}>
            {genres.map(({ name }) => (
              <StyledItem key={name}>{name}</StyledItem>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ marginTop: '20px', fontWeight: '500' }}>
        Additional Information
        <ul style={{ display: 'flex', gap: '20px' }}>
          <StyledItem>
            <Link to="cast">Cast</Link>
          </StyledItem>
          <StyledItem>
            <Link to="reviews">Reviews</Link>
          </StyledItem>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
