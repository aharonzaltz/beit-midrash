import {Component} from "@angular/core";
import { isMobile } from "src/app/services/app-utils.service";


@Component({
    template: "",
})
export abstract class LoginBaseComponent {
    isMobile = isMobile();
}