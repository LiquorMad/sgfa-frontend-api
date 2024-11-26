import React from 'react'

function MyAlertDialog({ visible,children,onClose,text }:any) {
  return (
    <div  className=" backdrop-blur-sm  fixed bg-black bg-opacity-25 p-4 inset-0 flex 
      justify-center items-center ">
      <div className="bg-white p-4 rounded m-2 drop-shadow-xl">
        <p className="py-4">{text}</p>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer" onClick={onClose}>✕</button>
          {children}
      </div>
    </div>
  )
}

export default MyAlertDialog