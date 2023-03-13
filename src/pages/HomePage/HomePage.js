import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchMoviesList } from "../services";
import ReactLoading from 'react-loading';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMoviesList()
      .then((res) => {setMovies(res.data);})
      .catch((err) => console.log(err.response.data));
  }, []);

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {movies.length?( movies.map((movie) => (
           <Link key={movie.id} to={`/sessoes/${movie.id}`}>
          <MovieContainer >
            <div data-test ="movie"><img src={movie.posterURL} alt={movie.title} /></div>
          </MovieContainer>
          </Link> 
        ))): (
      <LoadingHome>
        <ReactLoading type="spin" color="orange" height={600} width={350}/>
      </LoadingHome>
        ) }
      </ListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;
const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
const LoadingHome = styled.div`
margin-top: 135px;
height: 750px;
width: 400px;
`
