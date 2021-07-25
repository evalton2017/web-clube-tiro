import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { AdminService } from '../administrador/service/admin.service';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public albums_1: Array<any> = []
  public albums_1_aux: Array<any> = []
  campeonatos: Array<any> = [];
  loading = false;

  constructor(
    private lightbox: Lightbox,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.criarAlbums();
    this.listarCamnpeonatos();
  }


  criarAlbums() {
    this.albums_1_aux = [
      { img: "../../../assets/img/h_1.jpg", thumb: "../../../assets/img/h_1.jpg", description: "Image 1" },
      { img: "../../../assets/img/palestras.jpg", thumb: "../../../assets/img/palestras.jpg", description: "Image 2" },
      { img: "../../../assets/img/h_3.jpg", thumb: "../../../assets/img/h_3.jpg", description: "Image 3" },
      { img: "../../../assets/img/h_2.jpg", thumb: "../../../assets/img/h_2.jpg", description: "Image 1" },
      { img: "../../../assets/img/h_4.jpg", thumb: "../../../assets/img/h_4.jpg", description: "Image 2" },
      { img: "../../../assets/img/h_3.jpg", thumb: "../../../assets/img/h_3.jpg", description: "Image 3" },
      { img: "../../../assets/img/img_3.jpg", thumb: "../../../assets/img/img_3.jpg", description: "Image 3" },
    ];

    for (let i = 1; i <= this.albums_1_aux.length; i++) {
      const src = this.albums_1_aux[i - 1].img;
      const caption = 'Image ' + i;
      const thumb = this.albums_1_aux[i - 1].thumb;
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      this.albums_1.push(album);

    }
  }

  listarCamnpeonatos() {
    this.loading = true;
      this.homeService.listarCampeonatos()
      .subscribe(response => {
        if (response) {
         // this.campeonatos = response.retorno;
            response.retorno.forEach((camp)=>{
              this.getUrl(camp);          
          })
        }
        this.loading = false;
      }, err => {
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if (err['status'] == 422) {
          msg = "Erro ao consultar campeonatos.";
        }
      });
  }

  getUrl(camp: any) {
    this.homeService.getUrl(camp.foto)
      .subscribe(response => {
        if (response) {
          camp.url = response.retorno;
          this.campeonatos.push(camp);
        }
      }, err => {
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if (err['status'] == 422) {
          msg = "Erro ao consultar campeonatos.";
        }
      });
  }

  open(index: number): void {
    this.lightbox.open(this.albums_1, index);
  }

  close(): void {
    this.lightbox.close();
  }

}
