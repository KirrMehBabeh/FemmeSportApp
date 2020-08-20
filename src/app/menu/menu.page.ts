import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon:'home'
    },
    {
      title: 'Sports',
      children: [
        {
          title: 'Soccer',
          url: '/menu/soccer',
          icon:'football-outline'
        },
        {
          title: 'Rugby League',
          url: '/menu/rugbyleague',
          icon:'american-football-outline'
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
