import { FaqGroup, FaqItem } from '../interfaces/Webshop.interfaces';
import { PagesService } from '../services';
import { GetFaqResponse } from '../interfaces/Pages.interfaces';

export class FaqComponent {
    loading = true;
    faqGroups: FaqGroup[] = null;
    activeGroupId: number = null;
    activeGroupItems: FaqItem[] = [];
    constructor(
        private pagesService: PagesService
    ) { }

    loadFaqItems(): void {
        this.loading = true;
        this.pagesService.getFaq<GetFaqResponse>().subscribe((rsp) => {
            this.faqGroups = rsp.groups;
        }).add(() => {
            this.loading = false;
        });
    }

    getActiveGroup(): FaqGroup {
        return this.faqGroups.filter((g) => g.id === this.activeGroupId)[0];
    }

    setActiveGroup(id: number|string): void {
        const realId: number = typeof id === 'number' ? id : parseInt(id, 10);
        this.activeGroupId = realId;
        this.activeGroupItems = [];
        this.faqGroups.map((group: FaqGroup) => {
            if (group.id === realId) {
                group.items.forEach((item) => item.opened = false);
                this.activeGroupItems = group.items;
            }
        });
    }

    toggleItem(faqItem: FaqItem): void {
        faqItem.opened = !faqItem.opened;
    }
}
