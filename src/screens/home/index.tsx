import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AuthCont } from "apollo";
import { GET_COFFEE_SHOPS } from "apollo/gql/shop.gql";

import { Container } from "components/elements";
import PageTitle from "components/pageTitle";
import PinteresetLayout from "components/pinterest/layout";
import { CoffeeShop } from "types/coffeeShop";

import { Border } from "./styles";

function Home() {
  const navigate = useNavigate();
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop.Info[]>([]);

  const onCompleted = (data: any) => {
    setCoffeeShops(data.seeCoffeeShops);
  };

  useEffect(() => {
    console.log("here");
    useQuery(GET_COFFEE_SHOPS, { onCompleted });
  }, []);

  return (
    <Container>
      <PageTitle title="Home" />
      <button
        onClick={() => {
          AuthCont.signOutUser(navigate);
        }}
      >
        Logout Now!
      </button>
      <PinteresetLayout />
      <Border>
        {coffeeShops.map((shop, index) => {
          return <div key={index}>{shop.name}</div>;
        })}
      </Border>
      <button
        onClick={() => {
          navigate("create");
        }}
      >
        커피샵 추가하기
      </button>
    </Container>
  );
}

export default Home;
