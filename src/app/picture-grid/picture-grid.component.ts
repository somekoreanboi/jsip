import { Component, OnInit } from '@angular/core';
import { Company } from '../interfaces/company';



import { Tile } from './tile';

@Component({
  selector: 'app-picture-grid',
  templateUrl: './picture-grid.component.html',
  styleUrls: ['./picture-grid.component.scss']
})
export class PictureGridComponent implements OnInit {

  companies: Company[] = [
    {
    name: 'AnyMind',
    description: '2016年シンガポールで創業。インフルエンサー・クリエイターなどの個人、メディア・ブランド企業向けに、生産・EC構築・マーケティング・物流をワンストップで支援するソフトウェアとサービスを世界13市場17拠点で提供するテクノロジーカンパニー。',
    subname: 'this is subname',
    img: "https://jsip.asia/filebox/consortium/thumb/200_16320290286146c964234d84.56789040.png"
  },
  {
    name: 'GPC',
    description: 'GPCは、顧客のアジア圏における経営課題解決に特化した、各分野の専門家で構成される完全独立系コンサルティングファームです。顧客の”正しい意思決定”と”持続的な成長”にコミットし、”その先の企業運営”を支援いたします。',
    subname: 'this is subname 2',
    img: "https://jsip.asia/filebox/consortium/thumb/200_16320288236146c897b64dd8.43275726.png"
  },
  {
    name: 'JAC',
    description: 'シンガポールに進出し30年以上。人事・採用のプロフェッショナルとして、採用だけではなく、組織の人事課題・経営課題・採用課題などトータルでサポート。現在はアジアを中心に11カ国24拠点で展開。',
    subname: 'this is subname 2',
    img: "https://jsip.asia/filebox/consortium/thumb/200_1632895402615401aa837647.84691387.png"
  },
  {
    name: 'KINS',
    description: '体内に生息する1000兆の常在菌のバランスを整える「菌ケア」を通じて、自分らしい健康・美の実現を支援します。サプリメントや化粧品などの菌ケアプロダクト、検査キット、一人一人の状態に合わせたアドバイスを行うコンシェルジュなど、菌に関わるトータルケアサービスを提供しています。',
    subname: 'this is subname 2',
    img: "https://jsip.asia/filebox/consortium/thumb/200_163825026661a5b71ae57ca7.42206898.jpg"
  },
  {
    name: 'Nikkei',
    description: '日本経済新聞社およびグループ会社のアジア・オセアニアにおける現地法人。日本経済新聞国際版、日経電子版Pro、英文メディアのNikkei Asia等の定期購読販売・広告営業を行う他、アジア情報を英文で提供するデータベースscoutAsiaを扱う',
    subname: 'this is subname 2',
    img: "https://jsip.asia/filebox/consortium/thumb/200_1632838339615322c31590d6.45623176.png"
  }
]

gridColumns = 3;

toggleGridColumns() {
  this.gridColumns = this.gridColumns === 3 ? 4 : 3;
}

  constructor() { }

  ngOnInit(): void {
  }

}
