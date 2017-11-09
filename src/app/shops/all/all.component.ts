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
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  
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

  sales: number = 0;
  commission: number = 0;
  iniDate: any;
  finishDate: any;
  initDataS: string;
  finishDateS: string;
  constructor(public database: DatabaseService, public http:Http){
    this.database.getCommercesByCity('ambato').subscribe(shops=>{
      console.log(shops);
      shops.forEach(shop=>{
        let shopInfo = [];
        shopInfo.push(shop.name);
        shopInfo.push(shop.category);
        shopInfo.push(shop.phone);
        shopInfo.push(shop.adminName);
        shopInfo.push(shop.$key);
        shopInfo.push(shop.disabled);
        this.dataShops.push(shopInfo);
        if(shops.length == this.dataShops.length){
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
      moment.locale('es');
      self.iniDate = moment().date(1);
      self.initDataS = self.iniDate.format('DD/MM/YYYY');
      self.finishDate = moment().add('months', 1).date(0);
      self.finishDateS = self.finishDate.format('DD/MM/YYYY');

      self.database.getOrdersByShop(data[4]).subscribe((orders)=>{
        self.myOrders = orders;
        self.updateData();
        self.database.getCommerceInfo(data[4]).subscribe(shop=>{
          swal({
            title: 'Informacion',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            html:
                    '<b>Nombre: </b> ' + shop.name+ '  '+ 
                    '<b>Categoria: </b> ' + shop.category+'  '+ 
                    '<b>Telefono: </b> ' + shop.phone+'  '+ 
                    '<b>Propietario: </b> ' + shop.adminName+'  '+ 
                    '<b>Direccion: </b> ' + shop.billingAddress+'  '+ 
                    '<b>Ciudad: </b> ' + shop.city+'  '+ 
                    '<b>ID: </b> ' + shop.$key+
                    '<div class="rowS"><div class="form-group titleS marginS"><label class="label-control">Fecha de inicio</label><input type="text" class="form-control datetimepicker" value="'+self.initDataS+'" /></div><div class="form-group titleS marginS"><label class="label-control">Fecha de Fin</label><input type="text" class="form-control datetimepicker" value="'+self.finishDateS+'" /></div></div>'+
                    '<div rowC><p class="titleS">Pedidos totales: </p><p class="priceS">'+self.numOfOrders+'</p></div><div class="rowC"><p class="titleS">Pedidos Rechazados: </p><p class="priceS">'+self.numOfRefusedOrders+'</p></div><div class="rowC"><p class="titleS">Pedidos Terminados: </p><p class="priceS">'+self.numOfCompletedOrders+'</p></div><div class="rowC"><p class="titleS">Pedidos Inconclusos: </p><p class="priceS">'+self.numOfIncompletedOrders+'</p></div><div class="rowC"><p class="titleS">Total vendido: </p><p class="priceS">$'+self.sales+'</p></div><div class="rowC"><p class="titleS">Comision(9%): </p><p class="priceS">$'+self.commission+'</div></p>',
                    customClass: 'swal-wide',
            });
            $('.datetimepicker').datetimepicker({
              format: 'DD/MM/YYYY',
              icons: {
                  time: "fa fa-clock-o",
                  date: "fa fa-calendar",
                  up: "fa fa-chevron-up",
                  down: "fa fa-chevron-down",
                  previous: 'fa fa-chevron-left',
                  next: 'fa fa-chevron-right',
                  today: 'fa fa-screenshot',
                  clear: 'fa fa-trash',
                  close: 'fa fa-remove',
                  inline: true
              }
           });
        });
      });
      

        
        
        
        
    } );

    // Delete a record
    table.on( 'click', '.remove', function (e) {
        var $tr = $(this).closest('tr');
        table.row($tr).remove().draw();
        e.preventDefault();
    } );

    //Like record
    table.on( 'click', '.disable', function () {
      var $tr = $(this).closest('tr');
      var data = table.row($tr).data();
      console.log(data);
      self.disableCommerce(data[4]);
    });
    table.on( 'click', '.enable', function () {
      var $tr = $(this).closest('tr');
      var data = table.row($tr).data();
      console.log(data);
      self.enableCommerce(data[4]);
    });

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();
}
updateData(){
  this.numOfOrders = 0;
  this.numOfCompletedOrders= 0;
  this.numOfIncompletedOrders = 0;
  this.numOfRefusedOrders = 0;

  this.sales = 0;
  this.commission = 0;
  this.myOrders.forEach(order=>{
    let orderDate = moment(order.time);
    if(orderDate.isBetween(this.iniDate, this.finishDate)){
      this.numOfOrders++;
      if(order.status != 'refused' && order.status != 'pending' &&(order.status == 'recived' || order.status == 'rated')) {
        this.numOfCompletedOrders++;
        this.sales += order.products_total;
      }else{
        if(order.status == 'refused'){
          this.numOfRefusedOrders++;
        }else{
            this.numOfIncompletedOrders++;
        }
      }
      
    }
  });
  this.commission = this.sales * 0.09;
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

}
