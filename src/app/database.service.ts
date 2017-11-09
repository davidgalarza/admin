import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }
  createCommercePath(category:string,id:string, name:string, des:string, phone:string, city: string, adminName: string, ciRuc:string, billingAddress: string, bannerUrl: string, creationDate: string){
    return this.db.database.ref().child('commerces').child(id).set({
      name: name,
      category: category,
      description: des,
      adminName:adminName,
      ciRuc: ciRuc,
      city:city,
      phone: phone,
      billingAddress,
      attention: [
                    {
                      open: "",
                      close: "",
                      work: false
                    },
                    {
                      open: "",
                      close: "",
                      work: false
                    },
                    {
                      open: "",
                      close: "",
                      work: false
                    },
                    {
                      open: "",
                      close: "",
                      work: false
                    },
                    {
                      open: "",
                      close: "",
                      work: false
                    },
                    {
                      open: "",
                      close: "",
                      work: false
                    },
                    {
                      open: "",
                      close: "",
                      work: false
                    }
                    ],
      bannerUrl: bannerUrl,
      creation_date: creationDate

    });
  }
  getOrders(limit:number){
    return this.db.list('/orders/', {
      query: {
        limitToLast: limit 
      }
    });
  }
  getCommerceInfo(uid:string){
    return this.db.object('/commerces/'+uid);
  }
  getCategories(city: string){
    return this.db.list('/cities/'+city+'/categories');
  }
  getCommercesByCity(city:string){
    return this.db.list('/commerces',{
      query:{
        orderByChild: "city",
        equalTo: "ambato"
      }
    })
  }
  getBlipersByCity(city:string){
    return this.db.list('/blipers',{
      query:{
        orderByChild: "city",
        equalTo: "ambato"
      }
    })
  }
  getOrdersByShop(shopId:string){
    console.log(shopId);
    return this.db.list('/orders',{
      query: {
        orderByChild: 'commerceId',
        equalTo: shopId
      }
    });
  }
  setShopStatus(uid, status){

        this.db.database.ref('commerces/'+uid+'/disabled').set(status);

  }
  setBliperStatus(uid, status){
    
            this.db.database.ref('blipers/'+uid+'/disabled').set(status);
    
      }
  createCategory(city:string, name: string, display_name: string, imgUrl: string, color: string){
    return this.db.database.ref('cities/'+city+'/categories').push({
      color: color,
      display_name: display_name,
      img: imgUrl,
      name: name
    });
  }
  deleteCategory(city: string, id: string){
    return this.db.database.ref('/cities/' + city + '/categories/'+id).remove();
  }
  getMyCity(uid:string){
    return new Promise((resolve, reject)=>{
      this.db.list('/admins/').subscribe(admins=>{
        admins.forEach(admin=>{
          if(admin.$key == uid){
            resolve(admin.city);
          }
        });
      })
    });
  }
  getAdmin(uid: string){
    return this.db.object('/admins/'+uid);
  }
}

