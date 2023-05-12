import './Teams.css'
import {Table, TableBody, TableRow, TableContainer, TableCell} from "@mui/material";
import axios from "axios";
import { useState } from 'react';

const TeamsScreen = () => { 

    const [users, setUsers] = useState([])
    async function getUsers() {
        let data = {};
        
        await axios.get(
            `https://all-stars-8-henry-y5e3xhjq5q-ue.a.run.app/record` 
          ).then(function (response) {
            // handle success
            data = (response.data);
          }).catch(function (error) {
            // handle error
            console.log(error);
          })
        
        if(data !== 'null'){
            await setUsers(data);
        }
    }

    return (
        <>
            <div className="teams-banner">Rankings Submitted</div>
            <TableContainer className="teams-grid">
                <Table>
                    <TableBody>
                        <TableRow  className="header-row">
                                <TableCell className="team-name" align="right"></TableCell>
                                <TableCell className="rankings-header">
                                <div className='rank-label'>1</div>
                                <div className='rank-label'>2</div>
                                <div className='rank-label'>3</div>
                                <div className='rank-label'>4</div>
                                <div className='rank-label'>5</div>
                                <div className='rank-label'>6</div>
                                <div className='rank-label'>7</div>
                                <div className='rank-label'>8</div>
                                <div className='rank-label'>9</div>
                                <div className='rank-label'>10</div>
                                <div className='rank-label'>11</div>
                                <div className='rank-label'>12</div>
                                </TableCell>
                        </TableRow>
                        <TableRow  className="team-row">
                            <TableCell className="team-name" align="right">Austin</TableCell>
                            <TableCell className="team-queens" align="left">
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                            </TableCell>
                        </TableRow>
                        <TableRow  className="team-row">
                            <TableCell className="team-name" align="right">Henry</TableCell>
                            <TableCell className="team-queens" align="left">
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                                <div className='queen'></div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TeamsScreen;