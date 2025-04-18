import axios from "axios";

export const baseURL ="http://localhost:5001/food-app-43802/us-central1/app";
export const validateUserJWTToken = async(token) =>{
    try{
        const res = await axios.get(`${baseURL}/api/users/jwtVerification`,{
            headers : {Authorization : "Bearer "+token}
        })
        return res.data.data;
    }
    catch(err){
        return null;
    }
};

//add new product
export const addNewProduct = async(data)=>{
    try{
        const res=  await axios.post(`${baseURL}/api/Products/create`,{...data})
         return res.data.data;
    }
    catch(err){
        return null;

    }

};

//get all the products
export const getAllProducts = async()=>{
    try{
        const res=  await axios.get(`${baseURL}/api/Products/all`);
         return res.data.data;
    }
    catch(err){
        return null;

    }

};

//delete a product
export const deleteAProduct = async(productId)=>{
    try{
        const res=  await axios.delete(`${baseURL}/api/Products/delete/${productId}`);
         return res.data.data;
    }
    catch(err){
        return null;

    }

};

export const getAllUsers =async ()=>{
    try{
        const res= await axios.get(`${baseURL}/api/users/all`);
        return res.data.data;

    }
    catch(err){
        return null;
    }
};

//add an item to a cart
export const addNewItemToCart = async (user_id, data) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/Products/addToCart/${user_id}`,
        { ...data }
      );
      return res.data.data;
    } catch (error) {
      return null;
    }
  };

export const getAllCartItems = async (user_id) => {
    try {
      const res = await axios.get(
        `${baseURL}/api/Products/getCartItems/${user_id}`
      );
      return res.data.data;
    } catch (error) {
      return null;
    }
  };

//cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseURL}/api/Products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getAllOrder = async () => {
  try {
    const res = await axios.get(
      `${baseURL}/api/Products/orders`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
//update the order status
export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrder/${order_id}`,
      null,
      { params: { sts: sts } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};


