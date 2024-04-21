import logo from '../../assets/wordlinkLogo-no-bg.webp'
import { IconButton, Modal, Box, Typography } from '@mui/material';
import { Help } from '@mui/icons-material';
import { useState } from 'react';
import './app-header.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AppHeader() {
    const [isInstructionsModalOpen, setIsInstructionsModalOpen ]= useState(false);

    function handleInstructionsButtonClick() {
        setIsInstructionsModalOpen(true)
    }

    function handleInstructionsModalClose() {
        setIsInstructionsModalOpen(false)
    }

    return (
        <header className="app-header">
            <img className="wordlink-logo" src={logo} alt="Logo"/>
            <div className="app-header__actions">
                <IconButton className="icon-button" onClick={handleInstructionsButtonClick}>
                    <Help />
                </IconButton>
            </div>
            <Modal 
                open={isInstructionsModalOpen}
                onClose={handleInstructionsModalClose}
                aria-labelledby="instructions-modal-title"
                aria-describedby="instructions-modal-description"
            >
                <Box sx={style}>
                    <Typography id="instructions-modal-title" variant="h6" component="h2">
                        How to play
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Each game revolves around discovering a single target word.
                    </Typography>
                    <Typography id="instructions-modal-description" sx={{ mt: 2 }}>
                        Dive into the challenge by submitting your guesses for this word. Each guess you make is evaluated by a sophisticated model that assesses how close your guess is to the target. Treat each of your guesses as a clue, guiding you closer to unveiling the right word.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Remember, the lower your score, the nearer you are to the correct answer!
                    </Typography>
                </Box>
            </Modal>
        </header>
    )

}