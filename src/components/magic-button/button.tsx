"use client"

import React, { useState } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import Sparkles from './components/sparkles';
import Stars from './components/star';

interface Props extends LoadingButtonProps {
    children: React.ReactNode;
}

const StyledMagicButton = styled(LoadingButton)(({ theme }) => ({
    // background: `linear-gradient(45deg, ${theme.palette.primary.dark} 10%, ${theme.palette.primary.main} 90%)`,
    background: "linear-gradient(135deg, #390063, #d937ff, #9637ff)",
    border: 0,
    borderRadius: 999999,
    color: 'white',
    height: 39,
    padding: '0 20px',
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    gap: 5,
    transition: 'all 300ms ease-in-out',
    '& .MuiLoadingButton-loadingIndicator': {
        color: '#fff',
    },
}));

const MagicButton = ({ children, ...others }: Props) => {
    const [hover, setHover] = useState(false);
    const [sparkles] = useState<number[]>(Array(30).fill(0));

    return (
        <LazyMotion features={domAnimation}>
            <m.div
                onHoverStart={() => setHover(true)}
                onHoverEnd={() => setHover(false)}
                style={{ overflow: 'hidden', position: "relative" }}
            >
                <StyledMagicButton
                    {...others}
                >
                    <Sparkles sparkles={sparkles} hover={hover} />
                    <Stars hover={hover} />
                    {children}
                </StyledMagicButton>
            </m.div>
        </LazyMotion>

    )
};

export default MagicButton;
