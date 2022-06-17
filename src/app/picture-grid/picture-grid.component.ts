import { Component, OnInit } from '@angular/core';
import { Company } from '../interfaces/company';


@Component({
  selector: 'app-picture-grid',
  templateUrl: './picture-grid.component.html',
  styleUrls: ['./picture-grid.component.scss']
})
export class PictureGridComponent implements OnInit {

  companies: Company[] = [
    {
    name: 'M&S Parteners',
    description: "We are a Singaporean company that invests, incubates and accelerates startups, primarily in the Web 3.0 space, founded in 2022 by a founding team experienced in venture investing that has discovered multiple decacorn and unicorn companies.",
    subname: 'this is subname',
    img: "http://international.adtech-tokyo.com/wp-content/uploads/2016/07/Hiro-Mashita_logo.jpg", 
    company_link: "https://pitchbook.com/profiles/investor/118533-79/"
  },
  // {
  //   name: 'GPC',
  //   description: 'Global Partners Consulting specializes in global business expansion to Singapore and neighbouring ASEAN countries. We have 3 departments (Business Advisory, M&A Advisory, Accounting) that provide dedicated support for your business expansion overseas as well as after the expansion, using 2 key strategies: through expanding your own business OR the acquisition of local companies.',
  //   subname: 'this is subname 2',
  //   img: "https://jsip.asia/filebox/consortium/thumb/200_16320288236146c897b64dd8.43275726.png", 
  //   company_link: "https://www.g-pc.co.jp/?lang=en"
  // },
  // {
  //   name: 'JAC',
  //   description: 'JAC Group is a leading recruitment and business solutions consultancy, specialising in strengthening the growth of companies throughout Asia and Europe. Our services have been developed to work in seamless partnership with your business, uniquely tailored to your market and industry to deliver truly outstanding results.',
  //   subname: 'this is subname 2',
  //   img: "https://jsip.asia/filebox/consortium/thumb/200_1632895402615401aa837647.84691387.png",
  //   company_link: "https://www.jacgroup.com/"
  // },
  // {
  //   name: 'KINS',
  //   description: "  We support the realization of your own health and beauty through bacterial care that balances the 1000 trillion indigenous bacteria that live in your body. We provide total care services related to bacteria, such as bacteria care products such as supplements and cosmetics, test kits, and concierges that provide advice tailored to each individual's condition.",
  //   subname: 'this is subname 2',
  //   img: "https://jsip.asia/filebox/consortium/thumb/200_163825026661a5b71ae57ca7.42206898.jpg",
  //   company_link: "https://kin-japan.net/company_profile/"
  // },
  // {
  //   name: 'Nikkei',
  //   description: '	Acts as an operating holding company with newspaper businesses as a core. Group operations range from books, magazines to digital media, database service, broadcasting and other activities such as economic/cultural events',
  //   subname: 'this is subname 2',
  //   img: "https://jsip.asia/filebox/consortium/thumb/200_1632838339615322c31590d6.45623176.png",
  //   company_link: "https://www.nikkei.com/"
  // },
  
]

gridColumns = 5;

toggleGridColumns() {
  this.gridColumns = this.gridColumns === 3 ? 4 : 3;
}

  constructor() { }

  ngOnInit(): void {
  }

}
