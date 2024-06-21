import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';
import { useEffect, useState } from 'react';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer 7c77f1b4db998debe8d81a873f5fe532`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };
    
    if (movieId) {
      fetchCast();
    }
  }, [movieId]);

  return (
    <ul className={styles.castList}>
      {cast.map(member => (
        <li key={member.cast_id} className={styles.castItem}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
            alt={member.name}
          />
          <p>{member.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
