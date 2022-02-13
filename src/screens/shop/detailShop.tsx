import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { DELETE_COFFEE_SHOP, GET_COFFEE_SHOP } from "apollo/gql/shop.gql";

interface Photos {
  url: string;
}

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = Number(location.pathname.split("/")[2]);
  const [name, setName] = useState<string>("");
  const [images, setImages] = useState<Photos[]>([]);

  const onCompleted = (data: any) => {
    setName(data.seeCoffeeShop.name);
    setImages(data.seeCoffeeShop.photos);
  };

  useQuery(GET_COFFEE_SHOP, { onCompleted, variables: { id } });
  const [deleteCoffeeShop, { loading }] = useMutation(DELETE_COFFEE_SHOP);

  const handleDelete = async () => {
    await deleteCoffeeShop({ variables: { id } });
    navigate("/");
  };
  return (
    <div>
      {name}
      <img src={images[0]?.url} alt="" width="300px" height="500px" />
      <img src={images[1]?.url} alt="" width="400px" height="500px" />
      <img src={images[2]?.url} alt="" width="300px" height="500px" />
      <button>edit Shop Info</button>
      <button onClick={handleDelete}>delete Shop</button>
    </div>
  );
}

export default Detail;
