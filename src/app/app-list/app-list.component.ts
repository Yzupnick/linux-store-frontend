import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { App } from '../shared/app.model';
import { FlathubApiService} from '../flathub-api.service';

@Component({
  selector: 'flathub-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  apps: App[];
  selectedApp: App;
  errorMessage: string;

  constructor(
    private router: Router,
    private flathubApiService: FlathubApiService) {
  }

  getApps(): void {
    this.flathubApiService.getApps()
      .then(
        apps => this.apps = apps,
        error => this.errorMessage = <any> error);

    console.log('getApps');

  }

  ngOnInit() {
    this.getApps();
  }

  onSelect(app: App): void {
    console.log('SelectedApp = ' + app.flatpakAppId);
    this.selectedApp = app;
  }

  gotoDetail(flatpakAppId: string): void {
    this.router.navigate(['apps/details',flatpakAppId]);
  }

  isSelected(app: App): boolean {

    if (!app || !this.selectedApp) {
       console.log('isSelected' + false);
      return false;
    }
     console.log('isSelected' + (app.flatpakAppId === this.selectedApp.flatpakAppId));
    return app.flatpakAppId === this.selectedApp.flatpakAppId;
  }
}