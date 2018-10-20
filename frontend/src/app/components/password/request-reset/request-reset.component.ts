import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  public form={
    email:null
  };
  public error=null;

  constructor(
    private Jarwis: JarwisService,
    private notify: SnotifyService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.notify.info('Waiting ...',{timeout:5000});
    this.Jarwis.sendPasswordResetLink(this.form).
    subscribe(data=>this.handleResponse(data),
              error=>this.notify.error(error.error.error));
  }

  handleResponse(res){
    this.notify.success(res.data,{timeout:0});
    //console.log(res);
    this.form.email=null;
  }




}
