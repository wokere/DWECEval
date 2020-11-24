//clase que genera el dado, con un metodo para lanzarlo
class Dado{
    constructor(min,max){
        this.min = min;
        this.max = max;
    }
    lanzaDado(){
        return Math.floor(Math.random()*((this.max+1)-this.min)+this.min);
    }
}
export default Dado;