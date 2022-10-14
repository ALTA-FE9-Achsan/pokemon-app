import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { WithRouter } from "utils/Navigation";
import { useTitle } from "utils/hooks/useTitle";

import Container from "components/Layout";
import CardDetail from "components/CardDetail";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ButtonPrimary from "components/Button";
import { Link } from "react-router-dom";

function Detail(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useTitle(`Pokemon App | ${data.name}`);

  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    const { id_pokemon } = props.params;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id_pokemon}`)
      .then((res) => {
        const { data } = res;
        setData(data);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }
  console.log(data);

  return (
    <Container>
      <div>
        {loading ? (
          <Skeleton />
        ) : (
          <CardDetail
            link={data.id}
            nama={data.name}
            hp={data.stats[0].stat.name}
            nilaihp={data.stats[0].base_stat}
            attack={data.stats[1].stat.name}
            nilaiAttack={data.stats[1].base_stat}
            defence={data.stats[2].stat.name}
            nilaiDefence={data.stats[2].base_stat}
            specialA={data.stats[3].stat.name}
            nilaiSA={data.stats[3].base_stat}
            specialD={data.stats[4].stat.name}
            nilaiSD={data.stats[4].base_stat}
            speed={data.stats[5].stat.name}
            nilaiSpeed={data.stats[5].base_stat}
            height={data.height}
            weight={data.weight}
          />
        )}
      </div>

      {/* <Link to="/battle"> */}
      <div className="flex justify-center">
        <ButtonPrimary label="CATCH!" onNavigate={() => props.navigate(`battle/${data.name}`)} />
      </div>
      {/* </Link> */}
    </Container>
  );
}

export default WithRouter(Detail);
