import { Component } from '@angular/core';
import { WarenkorbKundenService } from '../../services/warenkorb-kunden.service';
import { WarenkorbService } from '../../services/warenkorb.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.css']
})
export class KundenComponent {

  kunden: any[];
  error = false;
  msg: string;
  berechnungData: any[];

  constructor(private kundenService: WarenkorbKundenService,
              private wkService: WarenkorbService) { }

  delete(id: number) {
    this.kundenService.delete(id).toPromise()
      .then((result) => {
        this.findAll();
      }).catch((err) => {
        console.error(err);
      });
  }

  update(kunde: any) {
    this.kundenService.update(kunde)
      .subscribe(
        (data: any) => this.onSuccess(data),
        err => this.onError(err)
      );
  }

  findAll() {
    this.kundenService.findAll()
        .subscribe(
          data => this.onSuccess(data),
          err => this.onError(err)
        );
  }

  findById(id: number) {
    if (!id) {
      this.showErrorMessage('id is mandatory!');
      return;
    }

    this.kundenService.findKundenById(id)
      .subscribe(
        data => this.onSuccess(data),
        err => this.onError(err)
      );
  }

  onSuccess(dbkunden: any[]) {
    this.kunden = dbkunden;
    this.showSuccessMsg('¡Kunden found!');
  }

  onError(err: any) {
    this.error = true;
    if (err.error.apiResult) {
      this.msg = err.error.apiResult;
    } else {
      this.msg = err.error.error;
    }
    console.error(err);
  }

  create(kunde: any) {
    this.kundenService.create(kunde)
        .subscribe(
          data => {
            this.kunden.pop();
            this.kunden.push(data[0]);
            this.addNewEmptyKuden();
          },
          err => this.onError(err)
        );
  }

  addNewEmptyKuden() {
    this.kunden.push({
      name: '',
      email: '',
      isNew: true
    });
  }

  showSuccessMsg(msg: string) {
    this.error = false;
    this.msg = msg;
  }

  showErrorMessage(msg: string) {
    this.error = true;
    this.msg = msg;
  }

  berechnung(wkIds: number[]) {
    if (!wkIds) {
      this.showErrorMessage('This Kunde has not Warenkoerbs!!');
      return;
    }

    const wks: any[] = [];
    this.berechnungData = [];

    wkIds.forEach(async (aWkId) => {
      await wks.push(this.wkService.berechnung(aWkId));
    });

    console.log(wks);

    forkJoin(wks).subscribe(
      res => {
          console.log('res', res);

          res.forEach(apiResponse => {

            const header = apiResponse.apiContent[0].header;
            const footer = apiResponse.apiContent[0].footer;
            const detail = apiResponse.apiContent[0].detail;

            const aBerechnung = {
              id: header.warenkorbId,
              total: footer.gesamt,
              totalDisccount: footer.totalRabatt,
              products: [] as any
            };

            if (apiResponse.apiContent[0].detail.length) {
              detail.forEach(product => {
                const aProduct = {
                  name: product.name,
                  quantity: product.anzahl,
                  price: product.preis,
                  disccount: {
                    type: product.rabatt.art,
                    value: product.rabatt.wert
                  },
                  finalPreis: product.preisNachRabbat
                };

                aBerechnung.products.push(aProduct);
              });

              this.berechnungData.push(aBerechnung);
            }
          });
          console.log('berechnung data', this.berechnungData);
        },
      err => console.error(err)
    );
  }

}
