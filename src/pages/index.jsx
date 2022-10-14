import Container from "components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

import { WithRouter } from "utils/Navigation";
import { useTitle } from "utils/hooks/useTitle";

import Card from "components/Card";
import ButtonPrimary from "components/Button";
import { data } from "autoprefixer";

function Home(props) {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState(0);
  useTitle("Pokemon App");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${next}`)
      .then((res) => {
        const { results } = res.data;
        const newNext = next + 20;

        const temp = [...datas];
        temp.push(...results);
        setDatas(temp);
        setNext(newNext);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }
  console.log(datas);
  return (
    <Container>
      <div>
        <div className="pokemon-container">
          <div className="grid grid-cols-2 lg:grid-cols-5">
            {datas.map((datum) => (
              <Card nama={datum.name} link={datum.url.substr(34, datum.url.length - 35)} onNavigate={() => props.navigate(`detail/${datum.name}`)} />
            ))}
          </div>
          <div className="flex justify-center items-center">
            <ButtonPrimary label="NEXT" onNavigate={() => fetchData()} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default WithRouter(Home);
