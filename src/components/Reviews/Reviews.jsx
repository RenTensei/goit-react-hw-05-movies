import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledItem } from 'components/Styled';
import { getMovieReviews } from 'services/request';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const setData = async () => {
      const data = await getMovieReviews(movieId);

      setReviews(data.results);
    };

    setData();
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>There are no reviews yet.</p>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reviews.map(({ author, content }) => (
            <StyledItem key={author} style={{ padding: '16px' }}>
              <p
                style={{
                  fontWeight: '500',
                  fontSize: '1.1em',
                  marginBottom: '8px',
                  marginTop: '0',
                }}
              >
                Author: {author}
              </p>
              {content}
            </StyledItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
