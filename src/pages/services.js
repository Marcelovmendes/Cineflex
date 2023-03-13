import axios from "axios";

export const fetchMoviesList = () => {
  const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies";

  return axios.get(url);
};

export const fetchSeatsList = (idAssentos) => {
  const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idAssentos}/seats`;
  return axios.get(url);
};

export const fetchSessionsList = (idSessao) => {
  const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idSessao}/showtimes`;
  return axios.get(url);
};

export const postReservationData = (selectedSeat, name, cpf) => {
  const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
  const data = {
    ids: selectedSeat,
    name: name,
    cpf: cpf,
  };
  return axios.post(url, data);
};
