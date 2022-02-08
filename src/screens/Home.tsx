import { signOutUser } from "apollo";
import { Container } from "components/elements";
import PageTitle from "components/pageTitle";

function Home() {
    return (
        <Container>
            <PageTitle title="Home" />

            <h1>Home</h1>
            <button onClick={signOutUser}>Logout Now!</button>
        </Container>
    );
}

export default Home;
