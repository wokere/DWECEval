class Auth
{
    constructor(url,data,propierty,method){
        this.url = url;
        console.log("aqui toy");
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
    formatData(){
        const objData = {};
        objData[this.prop] = this.data;
        return objData;
    }
}
export default Auth;