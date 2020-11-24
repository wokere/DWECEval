//clase que se encarga de hacer las peticiones al servidor
class Auth
{
    constructor(url,data,propierty,method){
        this.url = url;
        this.data = data;
        this.method = method;
        this.prop = propierty;
    }
    autorizar(callbackOk){
        $.ajax({
            method: this.method,
            url: this.url,
            data: this.formatData(this.prop,this.data),
        })
        .done(callbackOk)
    }
    //formateamos la propiedad y los datos en un objeto
    formatData(){
        const objData = {};
        objData[this.prop] = this.data;
        return objData;
    }
}
export default Auth;