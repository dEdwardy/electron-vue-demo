import API from './config'

export default class Common{
    static login(params){
        return API.post('/auth/login',params)
            .then(res => res)
            .catch(e =>e)
    }
    static friendsList(){
        return API.get('/friends')
            .then(res => res)
            .catch(e =>e)
    }

}
