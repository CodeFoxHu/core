import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../services';
import { RegistrationRequest } from '../interfaces/Customer.interfaces';

export class RegisterComponent {
    registrationLoading = false;
    registrationForm: FormGroup = null;
    constructor(
        private customerService: CustomerService
    ) { }
    initRegistrationForm(): void {
        this.registrationForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            passwordRepeat: new FormControl('', [Validators.required]),
            gdpr: new FormControl(false, [Validators.requiredTrue])
        });
    }
    registration(): void {
        this.registrationLoading = true;
        this.customerService.registration<RegistrationRequest, {}>({
            email: this.registrationForm.get('email').value,
            password: this.registrationForm.get('password').value,
            passwordRepeat: this.registrationForm.get('passwordRepeat').value,
            gdpr: this.registrationForm.get('gdpr').value
        }).subscribe((rsp) => {
            // Nothing to do
        }).add(() => {
            this.registrationLoading = false;
        });
    }
}
