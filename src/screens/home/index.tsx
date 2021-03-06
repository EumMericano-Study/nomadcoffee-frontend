import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AuthCont } from "apollo";
import { GET_COFFEE_SHOPS } from "apollo/gql/shop.gql";

import { Container } from "components/elements";
import PageTitle from "components/pageTitle";
import PinteresetLayout from "components/pinterest/layout";
import { CoffeeShop } from "types/coffeeShop";

import { Border } from "./styles";
import { ROUTES } from "constant";

function Home() {
  const navigate = useNavigate();
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop.Info[]>([]);

  const onCompleted = (data: any) => {
    setCoffeeShops(data.seeCoffeeShops);
  };
  useQuery(GET_COFFEE_SHOPS, { onCompleted });

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
          return (
            <div key={index}>
              <Link to={`${ROUTES.DETAIL}/${shop.id}`}>{shop.name}</Link>
            </div>
          );
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
