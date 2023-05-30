import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getMoviesByQuery } from 'services/request';
import { StyledItem } from './Home';

export const Movies = () => {
  const [seachParams, setSeachParams] = useSearchParams('');
  const queryURL = seachParams.get('query') ?? '';

  const [query, setQuery] = useState(queryURL);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const setData = async () => {
      try {
        const data = await getMoviesByQuery(query);

        setMovies(data?.results);
      } catch (error) {
        console.log(error);
      }
    };

    setData();
  }, [query]);

  const handleSubmit = (values, actions) => {
    const query = values?.movie ?? '';

    if (query) {
      setSeachParams({ query: query });
      setQuery(query);
    }

    actions.resetForm();
  };

  const location = useLocation();

  return (
    <div>
      <Formik onSubmit={handleSubmit} initialValues={{ movie: '' }}>
        <Form>
          <Field type="text" name="movie" placeholder="Enter movie name..." />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <ul>
        {movies.map(({ original_title, id }) => (
          <StyledItem key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {original_title}
            </Link>
          </StyledItem>
        ))}
      </ul>
    </div>
  );
};
