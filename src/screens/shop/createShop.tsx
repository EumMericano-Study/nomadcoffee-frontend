import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CREATE_COFFEE_SHOP } from "apollo/gql/shop.gql";
import { Container, Input } from "components/elements";

function CreateShop() {
  const { register, handleSubmit, formState, setError, clearErrors } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data: any) => {
    const {
      createCoffeeShop: { ok, error },
    } = data;
    if (!ok) return setError("result", { message: error });
  };

  const [createCoffeeShop, { loading }] = useCallback(
    useMutation(CREATE_COFFEE_SHOP, { onCompleted }) as any,
    []
  ) as any;

  const onSubmitValid = async (data: {
    [x: string]: string | FileUpload[];
  }) => {
    if (loading) return;
    const categories = [data.category1, data.category2, data.category3];

    const images = [data.image1[0], data.image2[0], data.image3[0]];
    console.log(images, categories);
    createCoffeeShop({ variables: { ...data, categories, images } });
  };

  const clearError = () => clearError;

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          type="text"
          placeholder="커피샾 이름"
          {...register("name", {
            required: "가게 이름을 입력해주세요.",
            onChange: clearError,
          })}
        />
        <Input
          type="text"
          placeholder="위도"
          {...register("latitude", {
            required: "가게의 위도를 알려주세요",
            onChange: clearError,
          })}
        />
        <Input
          type="text"
          placeholder="경도"
          {...register("longitude", {
            required: "가게의 경도를 알려주세요",
            onChange: clearError,
          })}
        />
        <Input
          type="text"
          placeholder="카테고리 1"
          {...register("category1", {
            required: "카테고리 1",
            onChange: clearError,
          })}
        />
        <Input
          type="text"
          placeholder="카테고리 2"
          {...register("category2", {
            required: "카테고리 2",
            onChange: clearError,
          })}
        />
        <Input
          type="text"
          placeholder="카테고리 3"
          {...register("category3", {
            required: "카테고리 3",
            onChange: clearError,
          })}
        />
        <Input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          {...register("image1", {
            required: true,
            onChange: clearError,
          })}
        />
        <Input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          {...register("image2", {
            required: true,
            onChange: clearError,
          })}
        />
        <Input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          {...register("image3", {
            required: true,
            onChange: clearError,
          })}
        />

        <input
          type="submit"
          value={loading ? "등록 중..." : "등록 완료"}
          disabled={!formState.isValid || loading}
        />

        <div>{formState?.errors?.result?.message}</div>
      </form>
    </Container>
  );
}

export default CreateShop;
