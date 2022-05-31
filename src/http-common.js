import axios from "axios";  
axios.interceptors.response.use( (res) => {
  
  return res;
 }, 
 (err) => {
   if(err.response.status === 500)
   {
//     swal({
//             text:".عدم ارتباط با سرور",
//             icon: "error",
//             closeOnClickOutside: false,
//           });
    }
   else if(err.response.status === 422)
   {
    // swal({
    //         text:"اطلاعات وارد شده اشتباه می باشد.",
    //         icon: "error",
    //         closeOnClickOutside: false,
    //       });
   }
   else{
    // swal({
    //   text:err.response.data.errors,
    //   icon: "error",
    //   closeOnClickOutside: false,
    // });
   }

  return Promise.reject(err);
 });

axios.defaults.headers.common[ 'Content-Type' ] = 'application/json';
export const HTTP = axios.create({
    // baseURL : `https://api.madein-iran.com/public/api`
    baseURL : 'http://localhost:8000/api'

  });