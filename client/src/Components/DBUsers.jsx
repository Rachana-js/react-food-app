import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllUserDetails } from '../context/actions/allUserAction';
import { getAllUsers } from '../api';
import DataTable from './DataTable';
import { avatar } from '../assests';


const DBUsers = () => {
  const allUsers = useSelector((state) =>state.allUsers);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!allUsers){
      getAllUsers().then((data)=>{
        dispatch(setAllUserDetails(data));
      });
    }
  },[allUsers,dispatch]);
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable columns={[
        {title:"Image",
        field:"photoURL",
        render:(rowData)=>(
          <img 
          src={rowData.photoURL ? rowData.photoURL : avatar}
          className='w-32 h-16 object-contain rounded-md' alt=''
          
          />
        ),},
        {
          title:"Name",
          field:"displayName",
        },
        {
          title:"Email",
          field:"email",
        },
        {
          title:"Verified",
          field:"email",
          render:(rowData)=>(
            <p 
            className={`px-2 py-1 w-32 text-center text-primary rounded-md ${rowData.emailVerified ? 
            "bg-emerald-500":"bg-red-500"}`}>
              {rowData.emailVerified ? "Verified" : "Not Verified"}

            </p>
          ),
        },

       
      ]}
      
      data={allUsers}
     title="List of Users"
    //  actions={[
    //   {
    //   icon:"edit",
    //   tooltip:"Edit Data",
    //   onClick: (event, rowData) => {
    //     alert("You want to edit"+rowData.productId)
    //   }
    //  },
    //  {
    //   icon:"delete",
    //   tooltip:"Delete Data",
    //   onClick: (event, rowData) => {
    //     if(window.confirm("Are you sure,You want to perform this action")
    //     )
    //     {
    //         deleteAProduct(rowData.productId).then((res) => {
    //           dispatch(alertSuccess("Product Id"));
    //           setInterval(() => {
    //             dispatch(alertNULL());
                
    //           }, 3000);
    //           getAllProducts().then((data) =>{
    //             dispatch(setAllProducts(data));
    //           });
    //         });
    //     }
    //     }
    //  }
    // ]}
      />
   
   
    </div>
   
  );
}

export default DBUsers
