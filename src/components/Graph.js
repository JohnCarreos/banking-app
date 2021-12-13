import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useState } from "react";
import { LineChart, Line, Tooltip, Legend, XAxis,YAxis, CartesianGrid } from "recharts";
import { makeStyles } from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

const Graph = ({id, open, setOpen}) => {

    const useStyles = makeStyles(() => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
    }));

    const handleClose = () => {
        setOpen(false);
    };

    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth()+1;
    let currentDate = `${month}/${date}`;

    const user = JSON.parse(localStorage.getItem(id))
    const data = user.balanceHistory
    console.log(data)
    if(data[data.length-1].name !== currentDate){
        data.push({'name': currentDate, 'balance': user.balance})
        localStorage.setItem(id, JSON.stringify(user))
    }

    console.log(data)

    const classes = useStyles()

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                className={classes.modal + ' container'}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className="graphModal p-4">
                    <LineChart
                        width={300}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis/>
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line
                            dot={{ stroke: '#ff4d2e' }}
                            strokeWidth={6}
                            type="monotone"
                            dataKey="balance"
                            stroke="tomato"
                            activeDot={{ r: 8 }}
                        />
                        <Legend />
                    </LineChart>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default Graph
