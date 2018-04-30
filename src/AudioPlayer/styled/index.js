import styled from 'styled-components'

export const ProgressContainer = styled.div`
  display: flex;
`

export const Progress = styled.div`
  border-top-right-radius: ${({ percent }) =>  percent === '100%' ? '0' : '0.15rem'};
  border-bottom-right-radius: ${({ percent }) =>  percent === '100%' ? '0' : '0.15rem'};
  flex-basis: ${({ percent }) => percent};
  height: 10px;
  background: linear-gradient(to right, #434343, #757575);
  transition: flex-basis 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
`
