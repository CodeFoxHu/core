import { ContactService } from '../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SendMessageRequest } from '../interfaces/Contact.interfaces';

export class ContactComponent {
    contactForm: FormGroup = null;
    sendMessageLoading = false;
    constructor(
        private contactService: ContactService
    ) {
        this.initContactForm();
    }
    initContactForm(): void {
        this.contactForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required]),
            message: new FormControl('', [Validators.required])
        });
    }
    sendMessage(): void {
        this.sendMessageLoading = true;
        this.contactService.sendMessage<SendMessageRequest>(this.contactForm.value).subscribe(() => {
            this.resetForm();
        }).add(() => {
            this.sendMessageLoading = false;
        });
    }
    resetForm(): void {
        this.contactForm.get('name').setValue('');
        this.contactForm.get('email').setValue('');
        this.contactForm.get('phone').setValue('');
        this.contactForm.get('message').setValue('');
    }
}
