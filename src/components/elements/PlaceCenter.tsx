import styled from "styled-components";

interface Props {
    children?: React.ReactNode;
}

function PlaceCenter(props: Props) {
    const { children } = props;
    return <Div>{children}</Div>;
}
export default PlaceCenter;

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin: auto;
`;
