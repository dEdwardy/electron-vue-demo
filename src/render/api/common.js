import API from './config'

export default class Common{
    static uploadImage(url, params){
        return API.post(url,params)
            .then(res => res)
            .catch(e => e)
    }
    static login(data){
        return API.post('/api/users/checkUser',data)
            .then(res => res)
            .catch(e => e)
    }
    static getChartData(param){
        return API.get('/api/chart/'+param)
            .then(res => res)
            .catch(e => e)
    }
    static getBuffer(params = {}){
        return API.get('http://localhost:8088/api/files/file',{...params})
            .then(res => res)
            .catch(e => e)
    }
    static generateExcel(url,params,config= {}){
        return API.post(url,params,{...config})
            .then(res => res)
            .catch(e => e)
    }
    

}
