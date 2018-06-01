import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { App } from '../../shared/app.model';
import { Collection } from '../../shared/collection.model';
import { LinuxStoreApiService } from '../../linux-store-api.service';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'store-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredCollections: Collection[];
  numCols: number;
  columnWidth = 170;
  minCols = 2;

  constructor(
    private router: Router,
    private linuxStoreApiService: LinuxStoreApiService,
    private seoService: SeoService) {

    this.setPageMetadata();

  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.linuxStoreApiService.getFeaturedCollections()
      .subscribe(collections => {
        this.featuredCollections = collections;
      });
  }

  getAppsByCollectionId(collectionId: string): App[] {
    let collectionApps: App[];
    this.linuxStoreApiService.getAppsByCollectionId(collectionId)
      .subscribe(apps => {
        collectionApps = apps;
      });
    return collectionApps;
  }

  onShowAppDetails(app: App) {
    this.router.navigate(['apps/details', app.flatpakAppId]);
  }

  onShowCollection(collectionId: string) {
    this.router.navigate(['apps/collection', collectionId]);
  }

  setPageMetadata() {
    const imageUrl: string = window.location.protocol + '//' + window.location.hostname + ':' +
      window.location.port + '/assets/themes/flathub/flathub-screenshot.png'

    this.seoService.setPageMetadata(
      'Flathub - An app store and build service for Linux',
      'Flathub is the home of hundreds of apps and games which can be easily installed on any Linux distribution. Enjoy GIMP, LibreOffice, VLC, Spotify and many more!',
      imageUrl);
  }

}
