import { Component, Injector, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HomeRankingModel } from 'src/app/model/home.model';

@Component({
  selector: 'ranking-produtos',
  templateUrl: './ranking-produtos.component.html',
  styleUrls: ['./ranking-produtos.component.css']
})
export class RankingProdutosComponent extends AppComponent {
  @Input() lstRankingModel: HomeRankingModel[] = [];

  constructor(injector: Injector) {
    super(injector);
  }



  getRowClass(index: number): string {
    if (index === 0) {
      return 'gold-row';
    } else if (index === 1) {
      return 'silver-row';
    } else if (index === 2) {
      return 'bronze-row';
    } else {
      return '';
    }
  }
}
