        import axios from "axios";


        export const fetchMoviesList=()=>{

        
            const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies"

            return axios.get(url)
        };

        export const fetchSeatsList = () =>{

            const url = "https://mock-api.driven.com.br/api/v8/cineflex/showtimes/ID_DA_SESSAO/seats"
            
          return axios.get(url)
        }

        export const fetchSessionsList = (idSessions) =>{

            const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idSessions}/showtimes`

           return axios.get(url)
        }

        export const postReservationData = (idSeats) =>{

            const url = `https://mock-api.driven.com.br/api/v8/cineflex/${idSeats}/book-many`
        
            return axios.post(url)
        }