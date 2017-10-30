import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';



@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  mapElement: HTMLElement;
  lat : any;
  long: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public googleMaps: GoogleMaps,public geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat =  resp.coords.latitude;
      this.long = resp.coords.longitude;
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
    
  }
  
 
  ionViewDidEnter() {
    this.loadMap();
    
   }
 
 
    

    loadMap() {

      let element: HTMLElement = document.getElementById('map');
      let map: GoogleMap = this.googleMaps.create(element);
     
     
      map.one(GoogleMapsEvent.MAP_READY).then(
        () => {
         let position: CameraPosition<{}> = {
           target: {
                   lat: this.lat,
                   lng: this.long
                 },
           zoom: 16,
           tilt: 30
      
         };
         map.moveCamera(position); 
               let markeroptions : MarkerOptions = {
             position: {
               lat: this.lat,
               lng: this.long
             },
             title: "Im here!"
           };
     
           let marker = map.addMarker(markeroptions).then((marker : Marker)=> {
             marker.showInfoWindow();
           });
        })
     
      
     
     }

   

}
