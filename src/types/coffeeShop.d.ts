export declare namespace CoffeeShop {
  interface Info {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    user: User.Info;
    photos: [Photo];
    caterories: [Category];
  }
}
