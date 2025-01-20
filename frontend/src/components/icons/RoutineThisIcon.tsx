import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 0.3rem;
  h2 {
    background: linear-gradient(15deg, var(--palette-600), var(--palette-200));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .icon-line{
    height: 4px;
    width: 100%;
    background: linear-gradient(15deg, var(--palette-600), var(--palette-200));
  }
`;
const RoutineThisIcon = () => {
  return (
    <Container>
      <div>
        <h2>Routine</h2>
      </div>
      <div>
        <h2>This</h2>
        <div className="icon-line"></div>
      </div>
    </Container>
  );
};

export default RoutineThisIcon;
