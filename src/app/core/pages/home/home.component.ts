import { Component } from '@angular/core';
import { ThreeDimensionalSceneComponent } from '../../../shared/components/three-dimensional-scene/three-dimensional-scene.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ThreeDimensionalSceneComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
