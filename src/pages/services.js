        import axios from "axios";


        export const fetchMoviesList=()=>{

        
            const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies"

            return axios.get(url)
        };

        export const fetchSeatsList = (idSeats) =>{

            const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSeats}/seats`
            
          return axios.get(url)
        }

        export const fetchSessionsList = (idSessions) =>{

            const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idSessions}/showtimes`

           return axios.get(url)
        }

        export const postReservationData = () =>{

            const url = `https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`
        
            return axios.post(url)
        }