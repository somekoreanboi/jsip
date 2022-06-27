import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})

export class CompanyDetailsComponent implements OnInit {

  @Input() company!: Company

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
  }

  challenge() {
    if (this.authService.isLoggedIn == true) {
      window.alert("You are logged in!")
    } else {
      window.alert("You are not logged in!")
    }
  }

}
