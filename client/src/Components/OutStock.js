import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const OutStock = (props) => {
  
  const {list} = props;
    // eslint-disable-next-line
  const temp = list.filter(e => e.quantity == 0);


  return (
    <div className='d-flex gap-2 p-2' style={{backgroundColor: "#cb2f5b", height: "6rem", width: "22%"}}>
        <HighlightOffIcon className='mt-2' sx={{color: "whitesmoke", width: "40%", height: "80%"}}/>
        <div className='d-flex flex-column ps-2 pt-2' style={{width: "60%"}}>
            <span style={{color: "white", fontSize: "18px"}}>Out of Stock</span>
            <span className='mt-1' style={{color: "white", fontSize: "22px"}}>{temp.length}</span>
        </div>
    </div>
  )
}

export default OutStock