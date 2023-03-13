import { useState, useEffect, React } from "react";
import { fetchSeatsList } from "../services";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { postReservationData } from "../services";
import ReactLoading from 'react-loading'


export default function SeatsPage() {
  const [seats, setSeats] = useState([]);
  const [selecteSeat, setSelecteSeat] = useState([]);
  const { idAssentos } = useParams();
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  console.log(selecteSeat)
  useEffect(() => {
    fetchSeatsList(idAssentos)
      .then((res) => {
        setSeats(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [idAssentos]);

  const handleIsSelected = (seat) => {
    if (seat.isAvailable) {
      setSelecteSeat([...selecteSeat, seat.id]);
    } else {
      alert("Aseento indisponivel");
    }
  };

  const selectedSeats = (e) => {
    e.preventDefault();
    const body = {
      movieTitle: seats.movie.title,
      sessionDate: `${seats.day.weekday} - ${seats.name}`,
      selectedSeats: selecteSeat,
      userName: name,
      clientCPF: cpf,
    };
    let ids = selecteSeat;
    postReservationData(ids, name, cpf).then(() =>
      navigate("/sucesso", { state: { data: body } })
    );
  };

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seats.seats ? (
          seats.seats.map((s) => (
            <SeatItem
              data-test="seat"
              key={s.id}
              isAvailable={s.isAvailable}
              isSelected={selecteSeat.includes(s.id)}
            >
              <div onClick={() => handleIsSelected(s)}>{s.name}</div>
            </SeatItem>
          ))
        ) : (
          <LoadingSeats>
             <ReactLoading type="spin" color="orange" height={290} width={220}/>
          </LoadingSeats>
        )}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle isSelected />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle isAvailable />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer>
        <form onSubmit={selectedSeats}>
          <label htmlFor="name"> Nome do Comprador:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome..."
            data-test="client-name"
          />
          <label htmlFor="cpf">CPF do comprador:</label>
          <input
            type="number"
            required
            value={cpf}
            maxLength={11}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF..."
            data-test="client-cpf"
          />
          <button data-test="book-seat-btn" type="submit">
            Reservar Assento(s)
          </button>
        </form>
      </FormContainer>
      <FooterContainer data-test="footer">
        <div>
          <img src={seats.movie && seats.movie.posterURL } alt="poster" />
        </div>
        <div>
          <p>{seats.movie && seats.movie.title }</p>
          <p>
            {seats.movie && seats.day.weekday } -
            {seats.movie && seats.name }
          </p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}
function getSeatColor(isAvailable, isSelected) {
  if (!isAvailable) {
    return "#FBE192";
  }
  if (isSelected) {
    return "#1AAE9E";
  }
  return "#C3CFD9";
}
function getSeatBorder(isAvailable, isSelected) {
  if (!isAvailable) {
    return "#F7C52B";
  }
  if (isSelected) {
    return "#0E7D71";
  }
  return "#7B8B99";
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
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  // Essa cor deve mudar // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  border: 1px solid
    ${(props) =>
      props.isSelected ? "#0E7071" : props.isAvailable ? "#7b8b99" : "#F7C52B"};
  background-color: ${(props) =>
    props.isSelected ? "#1AAE9E" : props.isAvailable ? "#C3CFD9" : "#FBE192"};
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid
    ${(props) => getSeatBorder(props.isAvailable, props.isSelected)};
  background-color: ${(props) =>
    getSeatColor(props.isAvailable, props.isSelected)};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
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
const LoadingSeats = styled.div`
width: 300px;
height: 250px;
margin-left: 60px;
`