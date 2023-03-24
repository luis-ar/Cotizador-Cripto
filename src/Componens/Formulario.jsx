import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../Hooks/useSelectMonedas";
import { monedas } from "../Data/monedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  width: 100%;
  border: none;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const DivError = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 700;
  background-color: #b7322c;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  padding: 15px;
`;

const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [criptoMoneda, CriptoSelectMonedas] = useSelectMonedas(
    "Elige tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, criptoMoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({moneda,criptoMoneda})
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <DivError>Todos los Datos son Obligatorios</DivError>}
      <SelectMonedas />
      <CriptoSelectMonedas />
      <InputSubmit type="submit" value="Cotizar" />
    </form>
  );
};

export default Formulario;
