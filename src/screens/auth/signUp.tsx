import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

import { ERROR, ROUTES } from "constant";
import PageTitle from "components/pageTitle";
import { Container, PlaceCenter } from "components/elements";

import { Input } from "./auth.styles";

const SIGN_UP_MUTATION = gql`
    mutation createAccount(
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(username: $username, email: $email, password: $password) {
            ok
            error
        }
    }
`;

function SignUp() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState,
        getValues,
        setError,
        clearErrors,
    } = useForm({
        mode: "onChange",
    });
    const onCompleted = (data: any) => {
        const {
            createAccount: { ok, error },
        } = data;
        const { username, password } = getValues();
        if (!ok) return setError("result", { message: error });
        else navigate(ROUTES.HOME, { state: { username, password } });
    };

    const [createAccount, { loading }] = useMutation(SIGN_UP_MUTATION, {
        onCompleted,
    });
    const onSubmitValid = (data: { [x: string]: string }) => {
        if (loading) return;
        createAccount({ variables: { ...data } });
    };

    const clearSignUpError = () => clearErrors("result");

    return (
        <Container>
            <PageTitle title="Sign In" />
            <PlaceCenter>
                <div>
                    <div>
                        <h1>Nomad Coffee</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Input
                            type="text"
                            placeholder="닉네임"
                            {...register("username", {
                                required: "닉네임을 입력해주세요",
                                minLength: {
                                    value: 4,
                                    message: ERROR.LONGER_THAN_FIVE,
                                },
                                onChange: clearSignUpError,
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="이메일"
                            {...register("email", {
                                required: "이메일을 입력해주세요",
                                minLength: {
                                    value: 4,
                                    message: ERROR.LONGER_THAN_FIVE,
                                },
                                onChange: clearSignUpError,
                            })}
                        />
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            {...register("password", {
                                required: "비밀번호를 입력해주세요",
                                minLength: {
                                    value: 4,
                                    message: ERROR.LONGER_THAN_FIVE,
                                },
                                onChange: clearSignUpError,
                            })}
                        />
                        <Input
                            type="password"
                            placeholder="비밀번호 확인"
                            {...register("passwordConfirm", {
                                required: "비밀번호 확인이 필요합니다",
                                minLength: {
                                    value: 4,
                                    message: ERROR.LONGER_THAN_FIVE,
                                },
                                onChange: clearSignUpError,
                            })}
                        />

                        <input
                            type="submit"
                            value={loading ? "로딩 중..." : "회원가입"}
                            disabled={!formState.isValid || loading}
                        />
                        <div>{formState?.errors?.result?.message}</div>
                    </form>
                    <span>Or</span>
                    <span>Log in with Facebook</span>
                    <div>
                        계정이 있다면? &nbsp;&nbsp;
                        <Link to={ROUTES.HOME}>로그인 하기</Link>
                    </div>
                </div>
            </PlaceCenter>
        </Container>
    );
}

export default SignUp;
