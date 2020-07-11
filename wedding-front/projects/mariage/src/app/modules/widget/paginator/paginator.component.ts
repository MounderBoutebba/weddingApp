import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit,DoCheck {

  @Input() public length = 1; //  Total
  @Input() public pageSize = 1; //  Size
  @Output() public page: EventEmitter<any> = new EventEmitter<any>();

  private pageIndex = 1;
  private previousPageIndex = 1;
  public items: number[] = [];
  private pages=1;

  constructor(private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
/*    this.res.subscribe(res => {
      console.log(res)
      this.length = res.total;
      this.pages = Math.ceil(this.length / this.pageSize);
      this.items = Array(this.pages).fill(0).map((val, index) => index+1);
    });*/

  }

  public firstPage() {
    this.pageIndex = 1;
    this.previousPageIndex = 1;
    this.cd.detectChanges()
    //Array(this.pages).fill(0).map((val, index) => index+1);
  }



  public goToPage(page: number) {
    this.previousPageIndex = this.pageIndex;
    this.pageIndex = page;
    this.emitPage();
    this.cd.detectChanges();
  }

  public prevPage() {
    if (this.pageIndex > 1) {
      this.previousPageIndex = this.pageIndex;
      this.pageIndex--;
      this.emitPage();
      this.cd.detectChanges();
    }
  }

  public nextPage() {
    if (this.pageIndex < Math.ceil(this.length / this.pageSize)) {
      this.previousPageIndex = this.pageIndex;
      this.pageIndex++;
      this.cd.detectChanges();
      this.emitPage();
    }

  }

  private emitPage() {
    this.page.emit({ pageIndex: this.pageIndex, previousPageIndex: this.previousPageIndex });
  }

  ngDoCheck(): void {
    if(this.length){
      this.pages = Math.ceil(this.length / this.pageSize);
      this.items = Array(this.pages).fill(0).map((val, index) => index+1);
    }


  }

}
