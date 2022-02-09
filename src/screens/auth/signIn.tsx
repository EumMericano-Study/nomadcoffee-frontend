import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { AuthCont } from "apollo";

import { ERROR, ROUTES } from "constant";
import PageTitle from "components/pageTitle";
import { Container, PlaceCenter } from "components/elements";
import { Input } from "./auth.styles";

export const SIGN_IN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;

function SignIn() {
    const location = useLocation() as any;

    const { register, handleSubmit, formState, setError, clearErrors } =
        useForm({
            mode: "onChange",
            defaultValues: {
                username: location?.state?.username || "",
                password: location?.state?.password || "",
                result: "",
            },
        });

    const onCompleted = (data: any) => {
        const {
            login: { ok, error, token },
        } = data;
        if (!ok) return setError("result", { message: error });
        if (token) {
            AuthCont.signInUser(token);
        }
    };
    const [login, { loading }] = useMutation(SIGN_IN_MUTATION, { onCompleted });

    const onSubmitValid = (data: { [x: string]: string }) => {
        if (loading) return;
        login({ variables: { ...data } });
    };

    const clearSignInError = () => clearErrors("result");

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
                            placeholder="Username"
                            {...register("username", {
                                required: "Check user name plz",
                                minLength: {
                                    value: 4,
                                    message: ERROR.LONGER_THAN_FIVE,
                                },
                                onChange: clearSignInError,
                            })}
                            hasError={Boolean(
                                formState?.errors?.username?.message
                            )}
                            disabled={loading}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Check password plz",
                                minLength: {
                                    value: 4,
                                    message: ERROR.LONGER_THAN_FIVE,
                                },
                                onChange: clearSignInError,
                            })}
                            hasError={Boolean(
                                formState?.errors?.password?.message
                            )}
                            disabled={loading}
                        />
                        <input
                            type="submit"
                            value={loading ? "Loading..." : "Log in"}
                            disabled={!formState.isValid || loading}
                        />
                        <div>{formState?.errors?.result?.message}</div>
                    </form>
                    <span>Or</span>
                    <span>Log in with Facebook</span>
                    <div>
                        아직 계정이 없다면? &nbsp;&nbsp;
                        <Link to={ROUTES.SIGN_UP}>회원가입 하기</Link>
                    </div>
                </div>
            </PlaceCenter>
        </Container>
    );
}

export default SignIn;
