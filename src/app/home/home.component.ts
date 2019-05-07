import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  // Flags
  loading = true;

  constructor(private router: Router, private activatedRoute:  ActivatedRoute) {}


  ngOnInit() {
        setTimeout( () => {
            this.loading = false;
            }, 2000
        );
        $('#top-nav .nav-item a').css('color','#919d9d');
  }
  ngAfterViewInit(){

  }
}
