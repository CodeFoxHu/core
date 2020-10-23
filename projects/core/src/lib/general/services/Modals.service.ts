import { ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';
import { DomService } from './dom.service';
import { BehaviorSubject } from 'rxjs';

export interface ModalType {
    domService: DomService;
    container: HTMLElement;
    configuration: ModalConfiguration;
}

export interface ModalConfiguration {
    name: string;
    component: any;
    inputs?: { [key: string]: any; };
    outputs?: { [key: string]: any; };
    free?: boolean;
    noneOpacity?: boolean;
    close?: boolean;
}

export class ModalsService {

    defaultModalConfiguration: ModalConfiguration = {
        component: null,
        name: null,
        close: true,
        free: false,
        inputs: {},
        outputs: {},
        noneOpacity: false
    };

    modals: ModalType[] = [];

    modalClose: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

    // TODO: MAYBE REWORK PARAMETERS ??? we should use an interface or sthg...
    open(modalConfiguration: ModalConfiguration): ComponentRef<any> {

        modalConfiguration = {
            ...this.defaultModalConfiguration,
            ...modalConfiguration
        };

        const self = this;

        document.body.classList.add('modalopened');

        if (modalConfiguration.free) {

            const domService: DomService = new DomService(
                this.componentFactoryResolver,
                this.appRef,
                this.injector,
                document.body,
                modalConfiguration.component, {
                    inputs: modalConfiguration.inputs,
                    outputs: modalConfiguration.outputs
            });

            this.modals.push({
                domService,
                container: document.body,
                configuration: modalConfiguration
            });

            return domService.childComponentRef;

        } else {

            let overlayElement: HTMLElement = null;
            let modalElement: HTMLElement = null;

            overlayElement = document.createElement('div');
            overlayElement.className = 'modal-overlay';
            if (modalConfiguration.noneOpacity) {
                overlayElement.classList.add('none-opacity');
            }
            overlayElement.onclick = (evt: MouseEvent) => {
                if (evt.target === overlayElement) {
                    self.close(name);
                }
            };

            modalElement = document.createElement('div');

            modalElement.className = 'modal';
            modalElement.id = 'modal-container-' + name;
            overlayElement.appendChild(modalElement);

            if (modalConfiguration.close) {
                const closeIcon: HTMLElement = document.createElement('i');
                closeIcon.className = 'modal-close-icon material-icons';
                closeIcon.innerHTML = 'close';
                modalElement.appendChild(closeIcon);
                closeIcon.onclick = (ev: MouseEvent) => {
                    self.close(name);
                };
            }

            const domService: DomService = new DomService(
                this.componentFactoryResolver,
                this.appRef,
                this.injector,
                modalElement,
                modalConfiguration.component, {
                    inputs: modalConfiguration.inputs,
                    outputs: modalConfiguration.outputs
            });

            this.modals.push({
                domService,
                container: overlayElement,
                configuration: modalConfiguration
            });

            document.body.appendChild(overlayElement);

            return domService.childComponentRef;

        }

    }

    close(name: string): void {

        this.modals.map((modal: ModalType) => {
            if (modal.configuration.name === name) {
                modal.domService.removeComponent();
                if (!modal.configuration.free) {
                    modal.container.parentElement.removeChild(modal.container);
                }
            }
        });

        this.modals = this.modals.filter((modal: ModalType) => {
            return modal.configuration.name !== name;
        });

        if (this.modals.length === 0) {
            document.body.classList.remove('modalopened');
        }

        this.modalClose.next(name);

    }

    closeAll(): void {

        this.modals.map((modal: ModalType) => {
            modal.domService.removeComponent();
            modal.container.parentElement.removeChild(modal.container);
        });

        this.modals = [];

    }

}
