import React from 'react'
import CategoryIcon from '@mui/icons-material/Category';

const Categories = (props) => {

  const {list} = props;
  let arr = [];

  let temp = list.map(e => e.category)

  for(let i=0; i<temp.length; i++){
    if(!arr.includes(temp[i])){
      arr.push(temp[i]);
    }
  }

  return (
    <div className='d-flex gap-2 p-2' style={{backgroundColor: "#00A0A0", height: "6rem", width: "22%"}}>
        <CategoryIcon className='mt-2' sx={{color: "whitesmoke", width: "40%", height: "80%"}}/>
        <div className='d-flex flex-column ps-2 pt-2' style={{width: "60%"}}>
            <span style={{color: "white", fontSize: "18px"}}>Categories</span>
            <span className='mt-1' style={{color: "white", fontSize: "22px"}}>{arr.length}</span>
        </div>
    </div>
  )
}

export default Categories