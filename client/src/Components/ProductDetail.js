import React from 'react'
import { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';

const ProductDetail = (props) => {

    const [product,setProduct] = useState({})
    const {open, close, id} = props

useEffect(() => {
    if(id !== undefined){
        axios.get(`http://localhost:8000/api/prod/getOne/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accToken")}`
            }
          }, {withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setProduct(res.data)

        })
        .catch((err)=>console.log(err))
    }
},[id])


  return (
    <div>
        <Dialog fullWidth maxWidth={'md'} open={open} onClose={close}>
            <DialogTitle sx={{ bgcolor:'#9093ea', fontSize:"1.9rem", color:"white"}}>{product.name}</DialogTitle>
            <DialogContent sx={{bgcolor:"white"}}>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Typography variant='body1' sx={{fontSize:"1.5rem"}}>Category: {product.category}</Typography>
                <Typography variant='body1' sx={{fontSize:"1.5rem"}}>Price: ${product.price}</Typography>
                <Typography variant='body1' sx={{fontSize:"1.5rem"}}>Quantity: {product.quantity}</Typography>
                <Typography variant='body1' sx={{fontSize:"1.5rem"}}>Description: {product.description}</Typography>
            </Box>
            </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductDetail