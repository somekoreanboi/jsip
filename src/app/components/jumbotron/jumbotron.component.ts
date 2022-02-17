import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {

  clickNavigate() {
    this.router.navigate(['/companies'])
  }
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
