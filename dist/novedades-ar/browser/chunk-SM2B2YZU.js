import{ca as o,f as p,i as s}from"./chunk-I4SIAQ55.js";var h=(()=>{let r=class r{constructor(t){this.http=t,this.urlApi="https://back-novedadesar-production.up.railway.app/"}getProducts(){return this.http.get(`${this.urlApi}products`)}getProductById(t){return this.http.get(`${this.urlApi}products/`+t)}searchAutocomplete(t){return this.http.get(`${this.urlApi}products?q=${{query:t}}`)}addProductToCard(t){return this.http.post(`${this.urlApi}carrito/`,t)}getProductByCard(t){return this.http.post(`${this.urlApi}carrito/get_card`,t)}comprarProduct(t){return this.http.post(`${this.urlApi}products/pago`,t)}deleteProductByCard(t){return this.http.post(`${this.urlApi}carrito/delete_card`,t)}changeCantidad(t){return this.http.post(`${this.urlApi}carrito/update_cantidad`,t)}getUbicacion(t){return this.http.get(`${this.urlApi}users/ubicacion/`+t)}getProductsByFilter(t){return this.http.post(`${this.urlApi}products/filter`,t)}getProductsByGender(t,e){return this.http.get(`${this.urlApi}products/gender/`+t+"/category/"+e)}};r.\u0275fac=function(e){return new(e||r)(s(o))},r.\u0275prov=p({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();export{h as a};
