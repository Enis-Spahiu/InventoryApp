import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const TotVal = (props) => {

  const {list} = props;

  const valueArr = list.map(e => e.price * e.quantity);
  let TotVal = 0;
  TotVal = valueArr.reduce((accumulator, currentValue) => accumulator + currentValue,TotVal);

  return (
    <div className='d-flex gap-2 p-2' style={{backgroundColor: "#61C9A8", height: "6rem", width: "22%"}}>
        <MonetizationOnIcon className='mt-2' sx={{color: "whitesmoke", width: "40%", height: "80%"}}/>
        <div className='d-flex flex-column ps-2 pt-2' style={{width: "60%"}}>
            <span style={{color: "white", fontSize: "18px"}}>Total Value</span>
            <span className='mt-1' style={{color: "white", fontSize: "22px"}}>$ {TotVal}</span>
        </div>
    </div>
  )
}

export default TotVal;