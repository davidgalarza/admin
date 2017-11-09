import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
//import initWizard = require('../../../../assets/js/init/initWizard.js');
import { AuthService } from '../../auth.service';
import { DatabaseService } from '../../database.service';
import { StorageService } from '../../storage.service';
import  * as moment from 'moment';

declare var $:any;
interface FileReaderEventTarget extends EventTarget {
    result:string
}
interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
}
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
    adminCity: any;
    categories = [];
    image: File;
    name: string;
    category:string;
    description: string;
    email:string;
    password: string;
    adminName: string
    ciRuc:any;
    city: string;
    phone:any;
    billingAddress:string;

    constructor( private authService: AuthService, private db: DatabaseService, public storage: StorageService) {
        this.authService.getUser().subscribe(user=>{
            this.db.getMyCity(user.uid).then((city)=>{
                this.adminCity = city;
                console.log(this.adminCity);
                this.db.getCategories(this.adminCity).subscribe(categories=>{
                    this.categories = categories;
                });
            });
            
        });
        console.log();
     }
  readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e:FileReaderEvent) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
    }
}
ngOnInit(){
    // Code for the Validator
    var $validator = $('.wizard-card form').validate({
      rules: {
        name: {
          required: true,
          minlength: 3
        },
        phone: {
          required: true,
          minlength: 3
        },
        description: {
          required: true,
          minlength: 3,
          maxlength: 70
        }
        },

        errorPlacement: function(error, element) {
            $(element).parent('div').addClass('has-error');
         }
  });
  
    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',

        onNext: function(tab, navigation, index) {
          var $valid = $('.wizard-card form').valid();
          if(!$valid) {
            $validator.focusInvalid();
            return false;
          }
        },

        onInit : function(tab, navigation, index){

          //check number of tabs and fill the entire row
          var $total = navigation.find('li').length;
          var  $width = 100/$total;
          var $wizard = navigation.closest('.wizard-card');

          var $display_width = $(document).width();

          if($display_width < 600 && $total > 3){
              $width = 50;
          }

           navigation.find('li').css('width',$width + '%');
           var $first_li = navigation.find('li:first-child a').html();
           var $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
           $('.wizard-card .wizard-navigation').append($moving_div);

        //    this.refreshAnimation($wizard, index);
        var total_steps = $wizard.find('li').length;
        var move_distance = $wizard.width() / total_steps;
        var step_width = move_distance;
        move_distance *= index;

        var $current = index + 1;

        if($current == 1){
            move_distance -= 8;
        } else if($current == total_steps){
            move_distance += 8;
        }

        $wizard.find('.moving-tab').css('width', step_width);
        $('.moving-tab').css({
            'transform':'translate3d(' + move_distance + 'px, 0, 0)',
            'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

        });

           $('.moving-tab').css('transition','transform 0s');
       },

        onTabClick : function(tab, navigation, index){

            var $valid = $('.wizard-card form').valid();

            if(!$valid){
                return false;
            } else{
                return true;
            }
        },

        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;

            var $wizard = navigation.closest('.wizard-card');

            // If it's the last tab then hide the last button and show the finish instead
            if($current >= $total) {
                $($wizard).find('.btn-next').hide();
                $($wizard).find('.btn-finish').show();
            } else {
                $($wizard).find('.btn-next').show();
                $($wizard).find('.btn-finish').hide();
            }

            var button_text = navigation.find('li:nth-child(' + $current + ') a').html();

            setTimeout(function(){
                $('.moving-tab').text(button_text);
            }, 150);

            var checkbox = $('.footer-checkbox');

            if( index !== 0 ){
                $(checkbox).css({
                    'opacity':'0',
                    'visibility':'hidden',
                    'position':'absolute'
                });
            } else {
                $(checkbox).css({
                    'opacity':'1',
                    'visibility':'visible'
                });
            }

            // this.refreshAnimation($wizard, index);
            var total_steps = $wizard.find('li').length;
            var move_distance = $wizard.width() / total_steps;
            var step_width = move_distance;
            move_distance *= index;

            var $current = index + 1;

            if($current == 1){
                move_distance -= 8;
            } else if($current == total_steps){
                move_distance += 8;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform':'translate3d(' + move_distance + 'px, 0, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

            });
        }
    });


    // Prepare the preview for profile picture
    $("#wizard-picture").change(function(){

        this.readURL(this);
    });

    $('[data-toggle="wizard-radio"]').click(function(){
        console.log('click');

        var wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked','true');
    });

    $('[data-toggle="wizard-checkbox"]').click(function(){
        if( $(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked','true');
        }
    });

    $('.set-full-height').css('height', 'auto');

}

ngOnChanges(){
    var input = $(this);
    var target:EventTarget;
    if (input.files && input.files[0]) {
        var reader:any = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}
ngAfterViewInit(){
    $('.wizard-card').each(function(){

        var $wizard = $(this);
        var index = $wizard.bootstrapWizard('currentIndex');
        // this.refreshAnimation($wizard, index);

        var total_steps = $wizard.find('li').length;
        var move_distance = $wizard.width() / total_steps;
        var step_width = move_distance;
        move_distance *= index;

        var $current = index + 1;

        if($current == 1){
            move_distance -= 8;
        } else if($current == total_steps){
            move_distance += 8;
        }
        console.log(move_distance);
        console.log(step_width);
        $wizard.find('.moving-tab').css('width', step_width);
        $('.moving-tab').css({
            'transform':'translate3d(' + move_distance + 'px, 0, 0)',
            'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

        });

        $('.moving-tab').css({
            'transition': 'transform 0s'
        });

        
        
    });
}

createCommercePath(){
    console.log('se clikeo');
    let creationDate = moment().format('ll');
    this.authService.signupCommerce(this.email, this.password)
    .then(firebaseUser => {
        console.log("Usuario: ",firebaseUser);
        this.image = (<HTMLInputElement>document.getElementById('wizard-picture')).files[0];
        console.log(this.image.name);
        this.storage.uploadImage(this.image, firebaseUser.uid, 'banner').then((image)=>{
            this.db.createCommercePath(this.category, firebaseUser.uid, this.name, this.description, this.phone.toString(), this.adminCity, this.adminName, this.ciRuc.toString(), this.billingAddress, image.downloadURL, creationDate).then(ss =>{
                console.log("se creo", ss)
                this.name = "";
                this.description = "";
                this.category = "";
                this.email = "";
                this.password = "";
                this.phone = "";
                this.adminName = "";
                this.billingAddress = "";
                this.ciRuc = "";
              });
        });

    });
  }
}
