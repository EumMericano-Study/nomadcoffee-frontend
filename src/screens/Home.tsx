import { isLoggedInVar } from "apollo";

import { Container } from "components/elements";

function Home() {
    return (
        <Container>
            <h1>Home</h1>
            <button onClick={() => isLoggedInVar(false)}>Logout Now!</button>
        </Container>
    );
}

export default Home;
