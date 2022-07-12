import {Inject, Injectable} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";
import {APP_TITLE} from "../config/app-config";
import {DOCUMENT} from "@angular/common";


@Injectable({providedIn: 'root'})
export class MetaDataPageService {

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private titleService: Title,
        private metaService: Meta
    ) {}

    changeMetaData(data: string) {
        this.metaService.updateTag({ name: 'description', content: data });
        this.titleService.setTitle(data);
        this.createLinkForCanonicalURL();
    }

    createLinkForCanonicalURL() {
        let existingLink: HTMLLinkElement | null = this.document.querySelector("link[rel=canonical]");
        let link: HTMLLinkElement = existingLink || this.document.createElement('link');
        if(!existingLink) {
            link.setAttribute('rel', 'canonical');
            this.document.head.appendChild(link);
        }
        link.setAttribute('href', this.document.URL);
    }

}