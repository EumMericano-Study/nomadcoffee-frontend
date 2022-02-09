import { signOutUser } from "apollo/makeVar/auth";
import { Container } from "components/elements";
import PageTitle from "components/pageTitle";
import PinteresetLayout from "components/pinterest/layout";

function Home() {
    return (
        <Container>
            <PageTitle title="Home" />
            <button onClick={signOutUser}>Logout Now!</button>
            <PinteresetLayout />
        </Container>
    );
}

export default Home;
