import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchSessionsList } from "../services";
import ReactLoading from 'react-loading';

export default function SessionsPage() {
  const [session, setSession] = useState([]);
  const { idSessao } = useParams();
  useEffect(() => {
    fetchSessionsList(idSessao)
      .then((res) => {
        //console.log(res.data);
        setSession(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [idSessao]);
 // console.log(session.days);
  return (
    <PageContainer>
      Selecione o horário
      {session.days ? (
        session.days.map((d) => (
          <div data-test="movie-day" key={d.id}>
            <SessionContainer>
              <div>
                {d.weekday} - {d.date}
              </div>
              <ButtonsContainer>
                {d.showtimes.map((h) => (
                  <Link key={h.id} to={`/assentos/${h.id}`}>
                    <button data-test="showtime">{h.name}</button>
                  </Link>
                ))}
              </ButtonsContainer>
            </SessionContainer>
          </div>
        ))
      ) : (<LoadingSessions>
         <ReactLoading type="spin" color="orange" height={500} width={325}/>
      </LoadingSessions>
      )}
       
      <div data-test="footer">
      <FooterContainer >
        <div data-test="footer">
          <img
            src={session.posterURL} 
            alt="poster"
          />
        </div>
        <div data-test="footer"> 
          <p>{session.title}</p>
        </div>
      </FooterContainer>
      </div>

    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;

const LoadingSessions = styled.div`
display: flex;
justify-content: center;
height: 600px;
width: 400px;
`