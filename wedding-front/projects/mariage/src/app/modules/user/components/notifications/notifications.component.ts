import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  public notifications: any[] = [];
  public currentPage: number;
  public totalItems=0
  public loading = true;
  public routeSubscription: Subscription;

  public constructor(
    private readonly notificationsService: NotificationsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router:Router
  ) {

  }

  public ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((query) => {
      this.currentPage = query.page || 1;
      this.getNotifications();
    });
  }

  public getNotifications() {
    this.loading = true;
    this.notificationsService.getNotificationsCount().subscribe(data => {
      this.notificationsService.emitNotificationsCount(data.count);
    });
    this.notificationsService.getAllNotifications(this.currentPage).subscribe((data: any) => {
      this.notifications = data.items.map((item) => {
        item.createdAt = (new Date(item.createdAt)).toLocaleString();
        return item;
      });
      this.totalItems=data.totalItems;
      this.loading = false;
    });
  }

  public markAllAsSeen(){
    this.notificationsService.markAllAsSeen().subscribe((res)=>{
      this.getNotifications();
    })
  }

  public refresh(){
    if(this.currentPage===1){
      this.getNotifications()
    }else{
      this.router.navigateByUrl(`/user/notification`);
    }
  }

  public markAsSeen(notif: any) {
    if(!notif.seen){
      this.notificationsService.markNotificationAsSeen(notif.id).subscribe((res) => {
        notif.seen = true;
        this.notificationsService.getNotificationsCount().subscribe(data => {
          this.notificationsService.emitNotificationsCount(data.count);
        });
      });
    }
  }

  public markAsUnseen(notif: any) {
    /*    this.notificationsService.markNotificationAsUnseen(notif.id).subscribe((res) => {
          notif.seen = false;
          this.notificationsService.getNotificationsCount().subscribe(data => {
            this.notificationsService.emitNotificationsCount(data.count);
          });
        });*/
  }

  public searchPaginated($event) {
    this.router.navigateByUrl(`/user/notification?page=${$event.pageIndex}`);
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
