import { Subscription } from 'rxjs';

export function unsubscribeFromAll(subscriptions: Subscription[]): void {
    subscriptions.forEach((subscription) => subscription.unsubscribe());
}
