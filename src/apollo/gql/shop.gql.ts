import { gql } from "@apollo/client";

export const GET_COFFEE_SHOPS = gql`
  query getCoffeeShopList($lastId: Int) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      photos {
        url
      }
    }
  }
`;
export const GET_COFFEE_SHOP = gql`
  query getCoffeeShopList($id: Int!) {
    seeCoffeeShop(id: $id) {
      name
      latitude
      longitude
      photos {
        url
      }
    }
  }
`;

//TODO:  image: temp String Array => Change to Upload Array
export const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $categories: [String]
    $images: [Upload]!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      images: $images
    ) {
      ok
      error
    }
  }
`;
