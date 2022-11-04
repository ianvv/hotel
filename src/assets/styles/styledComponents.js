import styled from "styled-components";
import defaultImg from "../img/defaultImg.jpg";

export const StyledWrapper = styled.div`
  background: url(${props => props.images ? props.images[0] : defaultImg}) center/cover no-repeat;
  min-height: calc(100vh - 66px);
  display: flex;
  align-items: center;
  justify-content: center;
`