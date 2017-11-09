import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { AuthService } from '../../auth.service';
import { StorageService } from '../../storage.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  image: File;
  category: any;
  adminCity: any;
  constructor(public database: DatabaseService, public storage: StorageService, public authService: AuthService) { 
    this.category = {
      name: '',
      display_name: '',
      color: '',
      img:''
    }
    this.authService.getUser().subscribe(user=>{
      this.database.getMyCity(user.uid).then((city)=>{
          this.adminCity = city;
      });
      
  });
  }


ngOnInit() {
  
}

  onSubmit():void{
    this.image = (<HTMLInputElement>document.getElementById('input-file')).files[0];
    this.storage.uploadImage(this.image, 'cities/'+this.adminCity,this.image.name).then((image)=>{
      this.database.createCategory(this.adminCity, this.category.name, this.category.display_name,image.downloadURL , this.category.color).then(ss=>{
        this.category = {
          name: '',
          display_name: '',
          color: '',
          img:''
        }
      })
    });
  }

}
