import styled from "@emotion/styled";

export const Toolbar = styled.div`
    display: flex;
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    width: 100%;
    
    justify-content: center;
    align-items: center;
    
    pointer-events: none;
`;

export const ToolbarCenter = styled.div`
    pointer-events: all;
`;
