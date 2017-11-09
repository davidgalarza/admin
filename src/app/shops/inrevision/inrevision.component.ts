import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service'
import { Http, Request, RequestMethod} from '@angular/http';
import  * as moment from 'moment';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}
declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-all',
  templateUrl: './inrevision.component.html',
  styleUrls: ['./inrevision.component.css']
})
export class InrevisionComponent implements OnInit {
  
  public dataTable: DataTable = {
    headerRow: [ 'Nombre', 'Categoria', 'Telefono', 'Propietario', 'ID', 'Acciones' ],
    footerRow: [ 'Nombre', 'Categoria', 'Telefono', 'Propietario', 'ID','Acciones' ],

   dataRows: []
};
  dataShops: Array<any> = [];
  myOrders: Array<any> = [];
  numOfOrders: number = 0;
  numOfCompletedOrders: number = 0;
  numOfIncompletedOrders: number = 0;
  numOfRefusedOrders: number = 0;

  selectedId: string;

  sales: number = 0;
  commission: number = 0;
  iniDate: any;
  finishDate: any;
  initDataS: string;
  finishDateS: string;
  constructor(public database: DatabaseService, public http:Http){
    this.database.getCommercesByCity('ambato').subscribe(shops=>{
      console.log(shops);
      let count = 0;
      shops.forEach(shop=>{
        let shopInfo = [];
        if(shop.status == 'inRevision'){
          shopInfo.push(shop.name);
          shopInfo.push(shop.category);
          shopInfo.push(shop.phone);
          shopInfo.push(shop.adminName);
          shopInfo.push(shop.$key);
          shopInfo.push(shop.disabled);
          this.dataShops.push(shopInfo);
        }
        count++;
        if(shops.length == count){
          var self=this;
          this.dataTable.dataRows = this.dataShops
          console.log(this.dataShops);
          setTimeout(function(){
              self.initTable();
          }, 10);
        }
      })
      
    });
  } 
  ngOnInit(){
  
}
private initTable(){
  var self=this;
    var table =$('#datatables').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        responsive: true,
        language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
        }

    });

    var table = $('#datatables').DataTable();

    // Edit record
    table.on( 'click', '.edit', function () {
      var $tr = $(this).closest('tr');
      var data = table.row($tr).data();
      self.selectedId = data[4];
      self.database.getCommerceInfo(data[4]).subscribe(shop=>{
        swal({
          title: 'Informacion',
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          html:
                  '<b>Nombre: </b> ' + shop.name+ '  '+ 
                  '<b>Categoria: </b> ' + shop.category+'  '+ 
                  '<b>Telefono: </b> ' + shop.billing.phone+'  '+ 
                  '<b>Propietario: </b> ' + shop.billing.name+' '+ 
                  '<b>Direccion: </b> ' + shop.billing.address+'  '+ 
                  '<b>Ciudad: </b> ' + shop.city+'  '+ 
                  '<b>ID: </b> ' + shop.$key+
                  '<div rowC><p class="titleS">Cantidad de productos: </p><p class="priceS">'+self.getCantOfProducts(data[4])+'</p></div><div class="rowC"><p class="titleS">Banner: </p><a target="_blank" class="priceS" href="'+shop.bannerUrl+'">Link</a></div><div class="rowC"><p class="titleS">Logo: </p><a target="_blank" class="priceS" href="'+shop.logoUrl+'">Link</a></div><div class="rowC"><p class="titleS">Descripcion: </p><p class="priceS">'+shop.description+'</p></div>',
                  customClass: 'swal-wide',
          });
      });
      
        
    } );

    // Delete a record
    table.on( 'click', '.remove', function (e) {
        var $tr = $(this).closest('tr');
        var data = table.row($tr).data();
        self.database.changeShopStatus(data[4], 'refused').then(()=>{
          table.row($tr).remove().draw();
          e.preventDefault();
        })


    } );

    //Like record
    table.on( 'click', '.accept', function () {
      var $tr = $(this).closest('tr');
      var data = table.row($tr).data();
      self.database.changeShopStatus(data[4], 'approved');
    });
    table.on( 'click', '.refuse', function () {
      var $tr = $(this).closest('tr');
      var data = table.row($tr).data();
      console.log(data);
    });

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();
}
disableCommerce(uid:any){
  console.log("en funcion", uid);
  this.http.get('https://us-central1-atiempo-5533e.cloudfunctions.net/disableUser/?uid='+uid).subscribe(res=>{
    console.log(res);
  });
  this.database.setShopStatus(uid, true)
}
enableCommerce(uid:any){
  console.log("en funcion", uid);
  this.http.get('https://us-central1-atiempo-5533e.cloudfunctions.net/enableUser/?uid='+uid).subscribe(res=>{
    console.log(res);
  });
  this.database.setShopStatus(uid, false);
}

getCantOfProducts(id: string){
  this.database.getOrdersByShop(id).subscribe(ss=>{
    return ss.length
  });
}

}
