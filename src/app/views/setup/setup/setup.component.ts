import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/animations/animations';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { ModalService } from 'src/app/shared/widget/modal/modal.service';
import { SetupService } from '../setup-service/setup.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  animations: [slideInAnimation],
})
export class SetupComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public setupServ: SetupService,
    public modal: ModalService,
    public gameParams: GameParametersService,
    private cdref: ChangeDetectorRef
  ) {}

  buttons: string[] = ['precedent', 'suivant'];
  setupRoutes: any = [];
  dots: boolean[] = [];
  displayModal: boolean = false;
  displayInfo: boolean[] = [];
  infoName: string[] = [];

  ngOnInit(): void {
    this.createIndexPages();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  createIndexPages() {
    if (!this.route.routeConfig?.children) return;
    const modifiedRoutes = [...this.route.routeConfig.children];
    modifiedRoutes.pop();
    modifiedRoutes.shift();
    this.setupRoutes = modifiedRoutes;
    this.setupServ.setRouteConfig(this.setupRoutes);
    this.setupServ.setDots();
    for (let index = 0; index < this.setupRoutes.length; index++) {
      this.displayInfo = [...this.displayInfo, false];
      this.setInfoPopName(this.setupRoutes[index].path);
    }
    this.dots = this.setupServ.disableDots;
  }

  setInfoPopName(name: string): void {
    switch (name) {
      case 'players':
        this.infoName.push('Nombre de joueurs');
        break;
      case 'names':
        this.infoName.push('Choix du nom');
        break;
      case 'difficulty':
        this.infoName.push('Choix de la difficulté');
        break;
      case 'themes':
        this.infoName.push('Choix du theme');
        break;
      default:
        break;
    }
  }

  setPopInfo(index: number): void {
    this.displayInfo[index] = !this.displayInfo[index];
  }

  changeChildren(value: string, dotIndex: any = undefined): void {
    const notTooFar = this.setupServ.childIndex < this.setupRoutes.length - 1;
    const notBeforeBegin = this.setupServ.childIndex > 0;

    if (value === 'suivant' && notTooFar)
      this.setupServ.setChildIndex(this.setupServ.childIndex + 1);

    if (value === 'precedent' && notBeforeBegin)
      this.setupServ.setChildIndex(this.setupServ.childIndex - 1);

    if (value === 'dot') this.setupServ.setChildIndex(dotIndex);

    const { path } = this.setupRoutes[this.setupServ.childIndex];
    this.router.navigateByUrl('/setup/' + path);
  }

  letsStart() {
    this.router.navigate(['/game']);
  }
}
