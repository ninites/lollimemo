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
  dots: string[] = [];
  errorMessage: { [key: string]: string } = {};
  displayModal: boolean = false;

  ngOnInit(): void {
    this.createIndexPages();
    this.setupServ.displayPathButton();
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
    for (let index = 0; index < this.setupRoutes.length; index++) {
      this.dots = [...this.dots, '.'];
    }
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
    this.errorMessage = this.gameParams.gameParamsValidation();
    if (Object.values(this.errorMessage).length > 0) {
      this.modal.switchModal();
      return;
    }
    this.router.navigate(['/game']);
  }
}
