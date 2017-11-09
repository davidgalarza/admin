import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  adminCity: any;
  commerces: Array<any> = [];
  rows: Array<any> = [];
  public tableData1;
  constructor(public database: DatabaseService, public authService: AuthService) { 
    this.authService.getUser().subscribe(user=>{
      this.database.getMyCity(user.uid).then((city)=>{
          this.adminCity = city;
      });
      
  });
  }

  ngOnInit() {
    this.database.getCommercesByCity(this.adminCity).subscribe((shops)=>{
      this.commerces = shops;
      this.database.getCategories(this.adminCity).subscribe((categories)=>{
        for(let i=0; i <categories.length; i++){
          this.getRow(shops, categories[i], i+1).then((row)=>{
            this.rows.push(row);
          });
        }
      });
    });
    
    this.tableData1 = {
      headerRow: [ '#', 'Nombre', 'Identificador', '# locales', 'Eliminar'],
      dataRows: this.rows
   };
  }

  getRow(commerces: Array<any>, category: any, index: number){
    return new Promise((resolve, reject)=>{
      commerces.forEach(shop=>{
        let categoryInfo: Array<any> = [];
        categoryInfo.push(index.toString());
        categoryInfo.push(category.display_name);
        categoryInfo.push(category.name);
        this.getNumOfCommercesByCategory(commerces, category.name).then(num=>{
          categoryInfo.push(num);
          categoryInfo.push(category.$key);
          resolve(categoryInfo)
        }); 
      });
    });
  }
  getNumOfCommercesByCategory(commerces: Array<any>, categoryName: string){
    return new Promise((resolve, reject)=>{
      let numOfShops = 0;
      let counted = 0;
      for(let i = 0; i < commerces.length; i++){
        if(commerces[i].category == categoryName){
          numOfShops++;
        }
        if(i+1 == commerces.length){
          resolve(numOfShops)
        }
      }
    });
  }
  deleteCategory(id: string){
    this.database.deleteCategory('ambato', id);
  }
    



}
