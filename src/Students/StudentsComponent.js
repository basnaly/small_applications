import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import { styled } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FilterStudentsComponent from "./FilterStudentsComponent";

const MyButton = styled(Button) ({
    textTransform: 'none',
    color: 'black',
    border: '1px solid black',
    fontSize: '16px',
})

const PAGE_SIZE = 3;

const requestURL = '/students-all';

const StudentsComponent = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(0);
    const [more, setMore] = useState(false);
    const [query, setQuery] = useState('')

    const requestStudents = () => {
        setLoading(true);

        axios.get(requestURL + `?start=${start}&count=${PAGE_SIZE}&${query}`)
            .then(result => {
                setData(result.data.students)
                setMore(result.data.more)
                setLoading(false)
            })
    }

    useEffect(() => {
        requestStudents()
    }, [start, query]) //change query -> new req, change start after next button -> new req

    return (
        <div className="parent-stl d-flex flex-column align-items-center">
            <div className="title-stl">
                List students
            </div>
            <TableContainer component={Paper} className="container my-3">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="row-stl">
                        <TableRow >
                            <TableCell>Full name</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Math grade</TableCell>
                            <TableCell align="center">English grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body-stl">
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell scope="row">
                                    {row.first} {row.last}
                                </TableCell>
                                <TableCell align="center">{row.age}</TableCell>
                                <TableCell align="center">{row.mathGrade}</TableCell>
                                <TableCell align="center">{row.engGrade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="d-flex m-3 ">
                {more &&
                    <MyButton onClick={() => setStart(prev => prev + PAGE_SIZE)}
                        variant={'outlined'} 
                        className="mx-2">
                        Next
                    </MyButton>
                }

                {start !== 0 &&
                    <MyButton onClick={() => setStart(prev => prev - PAGE_SIZE)}
                        variant={'outlined'} 
                        className="mx-2">
                        Previous
                    </MyButton>
                }     
            </div>
            <FilterStudentsComponent setQuery={ setQuery }/>
        </div>
    )
}

export default StudentsComponent;