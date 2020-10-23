import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Page, GetPageRequest, GetPageResponse } from '../interfaces/Pages.interfaces';
import { PagesService } from '../services';


export class PageComponent {

  page: Page = null;
  loading = false;

  constructor(
    private pagesService: PagesService,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {
    this.loadPage();
  }

  loadPage(): void {
    this.loading = true;
    this.pagesService.get<GetPageRequest, GetPageResponse>({
        slug: this.activatedRoute.parent.snapshot.url[0].path
    }).subscribe((rsp) => {
      this.page = rsp.page;
      this.title.setTitle(this.page.title);
    }).add(() => {
      this.loading = false;
    });
  }
}
