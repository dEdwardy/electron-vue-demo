import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 20000,
    withCredentials: true, // 是否允许带cookie这些
    headers: {
      'Content-Type': 'application/json'
    }
  });
  //拦截request
Axios.interceptors.request.use(config => {
    let token = localStorage.getItem('Token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
},error => {
    console.log(error)
    return Promise.error(error);
})
//拦截response
Axios.interceptors.response.use(res => {
    /*****
     * sth    eg:http 401，500 的处理
     */
    
    console.log('拦截res')
    return res
},err => {
    // console.log(err.response);
    // if(err.response.status===401){
    //     vm.$Message.warning(err.response.data)
    // }
    // setTimeout(() => {
    //     router.push('/login')
    // },2000)
})

export default Axios;