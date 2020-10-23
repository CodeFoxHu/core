import { NgModule } from '@angular/core';
import { DigitOnlyInputDirective } from './directives/DigitOnlyInput.directive';
import { NullValueOnEmptyStringDirective } from './directives/NullValueOnEmptyString.directive';
import { LoggedInTokenGuard } from './guards/logged.in.token.guard';
import { LoggedOutTokenGuard } from './guards/logged.out.token.guard';
import { ErrorInterceptor } from './interceptors/Error.interceptor';
import { LoaderInterceptor } from './interceptors/Loader.interceptor';
import { LockInterceptor } from './interceptors/Lock.interceptor';
import { TokenInterceptor } from './interceptors/Token.interceptor';
import { ApiService } from './services/Api.service';
import { InformationsService } from './services/Informations.service';
import { Mockinterceptor } from './interceptors/Mock.interceptor';
import { LoaderService } from './services/Loader.service';
import { LockService } from './services/Lock.service';
import { LoggerService } from './services/Logger.service';
import { TokenService } from './services/Token.service';

@NgModule({
    declarations: [
        DigitOnlyInputDirective,
        NullValueOnEmptyStringDirective
    ],
    providers: [
        ApiService,
        InformationsService,
        LoaderService,
        LockService,
        LoggerService,
        TokenService,
        ErrorInterceptor,
        LoaderInterceptor,
        LockInterceptor,
        TokenInterceptor,
        LoggedInTokenGuard,
        LoggedOutTokenGuard,
        Mockinterceptor
    ],
    exports: [
        DigitOnlyInputDirective,
        NullValueOnEmptyStringDirective
    ]
})
export class GeneralModule { }
