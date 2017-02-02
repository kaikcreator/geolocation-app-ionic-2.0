import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation } from 'ionic-native'; 

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  public map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.platform.ready().then(()=>{
      GoogleMap.isAvailable().then(()=>{
        let element: HTMLElement = document.getElementById('map');
        this.map = new GoogleMap(element);
        this.map.one(GoogleMapsEvent.MAP_READY).then((data:any)=>{
            //lets center map based on our position
            Geolocation.getCurrentPosition().then(pos => {
              let myPosition = new GoogleMapsLatLng(pos.coords.latitude, pos.coords.longitude);
              this.map.animateCamera({ target: myPosition,zoom: 10});
            this.map.addMarker({
              'position': myPosition,
              'title': 'you are here!'
            })
            })
        })
      }).catch(()=>alert("GoogleMap is not available"))
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
