import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_COFFEE_SHOP } from "apollo/gql/shop.gql";

function Detail() {
  const [name, setName] = useState<string>("");

  const onCompleted = (data: any) => {
    setName(data.seeCoffeeShop.name);
  };

  const {} = useQuery(GET_COFFEE_SHOP, { onCompleted });

  return (
    <div>
      {name}
      <button>edit Shop Info</button>
      <button>delete Shop</button>
    </div>
  );
}

export default Detail;
