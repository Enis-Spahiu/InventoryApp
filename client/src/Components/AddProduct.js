import React from 'react'
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';



const AddProduct = (props) => {
// eslint-disable-next-line
    const [openDialog,setOpenDialog] = React.useState(false)

    const {open, close, productList, setProductList} = props

    const [products,setProducts] = useState({
      name: '',
      category: '',
      price: '',
      quantity: "",
      description: '',
      image: ''
  })
  function handleChange(e){
    setProducts({
        ...products,
        [e.target.name]: e.target.value
    })
  }
  function handleSubmit(e){
    e.preventDefault()
        axios.post('http://localhost:8000/api/prod/create', products,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accToken")}`
          }
        } , {withCredentials: true})
        .then((res)=>{
            console.log(res)
            setProductList([...productList, res.data.result]);
            setProducts({
                name: '',
                category: '',
                price: '',
                quantity: '',
                description: '',
                image: ''
            })
        })
        .catch((err)=>{
            console.log(err)
        })
  }
  




  return (
    <div>
        {/* <Button onClick={handleClickOpen}>JJJJJ</Button> */}
        <Dialog open={open} onClose={close}>
        <DialogTitle sx={{ bgcolor:'#9093ea'}}>Add Product</DialogTitle>
        <DialogContent sx={{bgcolor:"white"}}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              elevation={3}
              sx={{ bgcolor:'white'}}
              autoFocus
              error={products.name === "" || products.name.length < 3}
              helperText={products.name === "" || products.name.length < 3 ? "Product name is mandatory; can't be less than 3 characters!": null}
              onChange={handleChange}
              name="name"
              margin="dense"
              id="name"
              size="small"
              label="Name"
              fullWidth
              variant="outlined"
            />
            <TextField
              sx={{ bgcolor:'white'}}
              error={products.category === "" }
              helperText={products.category === "" ? "Product must have a category!": null}
              onChange={(e)=> handleChange(e)}
              margin="dense"
              name="category"
              id="name"
              size="small"
              label="Category"
              fullWidth
              variant="outlined"
            />
            <TextField
              onChange={(e)=> handleChange(e)}
              error={products.price === "" }
              helperText={products.price === "" ? "Product must have a price!": null}
              sx={{ bgcolor:'white'}}
              name="price"
              margin="dense"
              id="name"
              size="small"
              label="Price"
              fullWidth
              variant="outlined"
            />
            <TextField
              onChange={(e)=> handleChange(e)}
              error={products.quantity === "" }
              helperText={products.quantity === "" ? "Product must have a quantity!": null}
              sx={{ bgcolor:'white'}}
              name="quantity"
              margin="dense"
              id="outlined-size-small"
              size="small"
              label="Quantity"
              fullWidth
              variant="outlined"
            />
            <TextField
              onChange={(e)=> handleChange(e)}
              error={products.description === "" || products.description.length < 10 || products.description.length > 200}
              helperText={products.description === "" || products.description.length < 10 || products.description.length > 200 ? "Please write a product description with 10-200 characters!": null}
              sx={{ bgcolor:'white'}}
              name="description"
              margin="dense"
              id="outlined-size-large"
              label="Description"
              fullWidth
              variant="outlined"
            />
            <Button type="submit" sx={{ bgcolor:'#9093ea'}} variant="contained" onClick={close}>Submit</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddProduct