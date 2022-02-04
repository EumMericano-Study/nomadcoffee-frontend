import styled from "styled-components";

interface Props {
    children?: React.ReactNode;
}

function Container(props: Props) {
    const { children } = props;
    return <Div>{children}</Div>;
}
export default Container;

const Div = styled.div`
    width: 100vw;
    min-height: 100vh;
`;
