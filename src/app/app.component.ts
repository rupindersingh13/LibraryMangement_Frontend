import { Component } from '@angular/core';
import { FormGroupName } from '@angular/forms';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  config : any;
  constructor(private configService: ConfigService){}
  title = 'AngularCRUD';

  // ngOnInit() {
  //   this.showConfig();
  // }

  // showConfig() {
  //   this.configService.postConfig(   )
  //     .subscribe((m: any) => {
  //       this.config = m.data;
  //       console.log(this.config, "config");
  //     });
 // }
}
