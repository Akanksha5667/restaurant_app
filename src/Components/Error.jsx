import React, { useEffect } from 'react'

function Error() {
    useEffect(()=>{
        throw Error('Crashed!!!!');
    })
  return (
    <div>
      
    </div>
  )
}

export default Error
