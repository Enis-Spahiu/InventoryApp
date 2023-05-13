import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductDetail from './ProductDetail';
import Modal from 'react-bootstrap/Modal'

const ProductList = (props) => {

  const [show, setShow] = useState(false);
  const {list,setList} = props;
  const [delId, setDelId] = useState('')
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#9093ea",
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      const handleDelete = (params) => {
        // console.log(params)
        axios.delete(`http://localhost:8000/api/prod/delete/${params}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accToken")}`
          }
        }, {withCredetials: true})
          .then(res => {
            console.log(res);
            let temp = list.filter(e => e._id !== params);
            setList(temp)
            handleClose();
          })
          .catch(err => {
            console.log(err);
          })
      }
      
      //Product Detail
      const [openDetail,setOpenDetail] = React.useState(false)
      const [id,setId] = useState(undefined)



  const handleOpenDetail = () => {
    setOpenDetail(true);
  };
  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  function handleView(params){
    handleOpenDetail();
    setId(params)
  }

      const handleClick = (id)=>{
        setDelId(id);
        handleShow();
      }

      useEffect(()=>{
        axios.get('http://localhost:8000/api/prod/getAll',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accToken")}`
          }
        } , {withCredentials: true})
            .then((res)=>{
                // console.log(res.data)
                setList(res.data);
            })
            .catch((err)=>console.log(err))
            
      // eslint-disable-next-line
      },[])
      
  return (
    <div style={{width: "100%", height: "fit-content"}}>
      <ProductDetail open={openDetail} id={id} close={handleCloseDetail}/>
        <Modal style={{marginTop: "250px"}} backdrop="static" keyboard={false} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the product?</Modal.Body>
          <Modal.Footer>
            <button onClick={event => handleClose()} className='btn btn-secondary'>Cancel</button>
            <button onClick={event => handleDelete(delId)} className='btn btn-danger'>Confirm</button>
          </Modal.Footer>
        </Modal>
        <TableContainer sx={{ borderRadius:'8px' }}>
            <Table sx={{ minWidth: 650}} aria-label="customized table">
              <TableHead>
                <TableRow >
                  <StyledTableCell sx={{width:"20%"}}>Name</StyledTableCell>
                  <StyledTableCell sx={{width:"20%"}} align="left">Category</StyledTableCell>
                  <StyledTableCell sx={{width:"20%"}} align="left">Price</StyledTableCell>
                  <StyledTableCell sx={{width:"20%"}} align="left">Quantity</StyledTableCell>
                  <StyledTableCell sx={{width:"20%"}} align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((list,index)=>(
                  <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {list.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{list.category}</StyledTableCell>
                    <StyledTableCell align="left">{list.price}</StyledTableCell>
                    <StyledTableCell align="left">{list.quantity}</StyledTableCell>

                    <StyledTableCell align="left">

                      <RemoveRedEyeIcon style={{cursor: "pointer"}} onClick={()=>handleView(list._id)} />
                      <EditIcon sx={{ml:2}} style={{cursor: "pointer"}}/>
                      <DeleteIcon sx={{ml:2}} style={{cursor: "pointer"}} onClick={() => handleClick(list._id)}/>
                    </StyledTableCell>

                  </StyledTableRow>

                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  )
}

export default ProductList