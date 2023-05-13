import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const TotProd = (props) => {

  const {list} = props;

  const temp = list.map(e => e.name)

  return (
    <div className='d-flex gap-2 p-2' style={{backgroundColor: "#5B618A", height: "6rem", width: "22%"}}>
        <ShoppingCartIcon className='mt-2' sx={{color: "whitesmoke", width: "40%", height: "80%"}}/>
        <div className='d-flex flex-column ps-2 pt-2' style={{width: "60%"}}>
            <span style={{color: "white", fontSize: "18px"}}>Total Products</span>
            <span className='mt-1' style={{color: "white", fontSize: "22px"}}>{temp.length}</span>
        </div>
    </div>
  )
}

export default TotProd;