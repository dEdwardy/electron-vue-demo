import API from './config'

export default class Common{
    static login(data){
        return API.post('/auth/login',data)
            .then(res => res)
            .catch(e => e)
    }
    

}
