import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThreeDimensionalSceneComponent } from "./shared/components/three-dimensional-scene/three-dimensional-scene.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ThreeDimensionalSceneComponent]
})
export class AppComponent {

}
