import React, { useState } from "react";

import { styled } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputComponent from "./InputsComponent";

const FilterButton = styled(Button)({
    textTransform: 'none',
    color: 'deeppink',
    border: '1px solid deeppink',
    fontSize: '16px',
})

const SubmitButton = styled(Button)({
    textTransform: 'none',
    color: 'dodgerblue',
    border: '1px solid dodgerblue',
    fontSize: '16px',
})

const CancelButton = styled(Button)({
    textTransform: 'none',
    color: 'deeppink',
    border: '1px solid deeppink',
    fontSize: '16px',
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid lightskyblue',
    boxShadow: 24,
    p: 4,
  };

const FilterStudentsComponent = ({ setQuery }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [maxAge, setMaxAge] = useState(100);
    const [minAge, setMinAge] = useState(0);
    const [maxMathGrade, setMaxMathGrade] = useState(100);
    const [minMathGrade, setMinMathGrade] = useState(0);
    const [maxEngGrade, setMaxEngGrade] = useState(100);
    const [minEngGrade, setMinEngGrade] = useState(0);

    const handleOpen = () => setIsModalOpen(true)
    const handleClose = () => setIsModalOpen(false);

    const constructQuery = () => {
        setQuery(`max-age=${ maxAge }&min-age=${ minAge }&max-math-grade=${
            maxMathGrade
        }&min-math-grade=${ minMathGrade }&max-eng-grade=${
            maxEngGrade
        }&min-eng-grade=${ minEngGrade }`)

        setIsModalOpen(false);
    }

    const cancel = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            <FilterButton onClick={handleOpen}
                variant={'outlined'}
                className="mx-2">
                Filter
            </FilterButton>

            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography className="text-center" 
                        id="modal-modal-title" variant="h6" component="h2">
                        Select the values:
                    </Typography>
                    <Typography className="d-flex align-items-center justify-content-center" 
                        id="modal-modal-description" sx={{ mt: 2 }}>
                        The age of students
                        <InputComponent max={ maxAge } min={ minAge }
                            setMax={ setMaxAge } setMin={ setMinAge }/>
                    </Typography>
                    <Typography className="d-flex align-items-center justify-content-center"
                        id="modal-modal-description" sx={{ mt: 2 }}>
                        The Math grade
                        <InputComponent max={ maxMathGrade } min={ minMathGrade }
                            setMax={ setMaxMathGrade } setMin={ setMinMathGrade }/>
                    </Typography>
                    <Typography className="d-flex align-items-center justify-content-center"
                        id="modal-modal-description" sx={{ mt: 2 }}>
                        The English grade
                        <InputComponent max={ maxEngGrade } min={ minEngGrade }
                            setMax={ setMaxEngGrade } setMin={ setMinEngGrade }/>
                    </Typography>

                    <div className="d-flex justify-content-center">
                        <SubmitButton onClick={ constructQuery }
                            variant={'outlined'} className="align-self-center mt-4 mb-3 mx-2" 
                            size="small" >
                            Submit
                        </SubmitButton>
                        <CancelButton onClick={ cancel }
                            variant={'outlined'} className="align-self-center mt-4 mb-3 mx-2" 
                            size="small" >
                            Cancel
                        </CancelButton>
                    </div>

                </Box>
                
            </Modal>
        </div>
    )
}

export default FilterStudentsComponent;