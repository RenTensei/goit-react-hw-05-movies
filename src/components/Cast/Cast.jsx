import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledItem } from 'components/Styled';
import { getMovieCast } from 'services/request';

const Cast = () => {
  const [cast, setCast] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const setData = async () => {
      const data = await getMovieCast(movieId);
      console.log(data);

      setCast(data.cast);
    };

    setData();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      {cast.length === 0 ? (
        <p>There is no info about cast yet.</p>
      ) : (
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {cast.map(({ name, character, profile_path }) => (
            <StyledItem key={name} style={{ padding: '16px', Width: '192px' }}>
              <img
                src={`https://image.tmdb.org/t/p/original${profile_path}`}
                alt={name}
                loading="lazy"
                style={{ display: 'block', background: 'grey' }}
                width="160"
                height="240"
              />
              <p
                style={{
                  fontWeight: '500',
                  fontSize: '1.1em',
                  marginBottom: '8px',
                  marginTop: '0',
                  maxWidth: '160px',
                }}
              >
                {name}
              </p>
              <p style={{ maxWidth: '160px', margin: '0' }}>{character}</p>
            </StyledItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cast;
