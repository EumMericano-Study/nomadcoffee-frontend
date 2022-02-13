import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_COFFEE_SHOP } from "apollo/gql/shop.gql";

interface Photos {
  url: string;
}

function Detail() {
  const location = useLocation();
  const id = Number(location.pathname.split("/")[2]);
  const [name, setName] = useState<string>("");
  const [images, setImages] = useState<Photos[]>([]);

  const onCompleted = (data: any) => {
    setName(data.seeCoffeeShop.name);
    setImages(data.seeCoffeeShop.photos);
  };

  useQuery(GET_COFFEE_SHOP, { onCompleted, variables: { id } });

  return (
    <div>
      {name}
      <img src={images[0]?.url} alt="" width="300px" height="500px" />
      <img src={images[1]?.url} alt="" width="400px" height="500px" />
      <img src={images[2]?.url} alt="" width="300px" height="500px" />
      <button>edit Shop Info</button>
      <button>delete Shop</button>
    </div>
  );
}

export default Detail;
