import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BabylonServiceService } from '../services/babylon-service.service';
import * as Babylon from '@babylonjs/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { style } from '@angular/animations';
@Component({
  selector: 'app-three-dimensional-scene',
  standalone: true,
  imports: [],
  templateUrl: './three-dimensional-scene.component.html',
  styleUrl: './three-dimensional-scene.component.scss'
})
export class ThreeDimensionalSceneComponent implements AfterViewInit  {
  constructor(private readonly engineService:BabylonServiceService){}
  private scene!:Babylon.Scene;
  @ViewChild('rCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private createScene(engine:Babylon.Engine): void {
    this.scene = new Babylon.Scene(engine);
    const camera = new Babylon.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Babylon.Vector3(0, 0, 5), this.scene);
    camera.attachControl(this.canvasRef.nativeElement, true); // Use nativeElement

    const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(1, 1, 0), this.scene);
    const box = Babylon.MeshBuilder.CreateBox("box", { size: 2 }, this.scene);
    const ground = Babylon.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, this.scene);
    gsap.registerPlugin(ScrollTrigger);
    this.canvasRef.nativeElement.style.height = '100vh'; // Or any other appropriate height
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:'body',
        start: 'top top',
        end: '50% 50%',
        scrub: 1,
      }
    });

    tl.to(box.rotation, { y: Math.PI * 2, duration: 100 }, 0);


    const tl2 = gsap.timeline({
      scrollTrigger:{
        trigger:'body',
        start: '50% 50%',
        end: 'bottom bottom',
        scrub: 1,
      }
    });
// Wrapper height animation
const wrapper = document.getElementById('wrapper');
tl2.to('.wrapper', { width: 0, duration: 2 }, 1);

  }
ngAfterViewInit(): void {
  const engine = this.engineService.createEngine(this.canvasRef.nativeElement);
  this.createScene(engine); // Now call createScene here
  this.engineService.start(this.canvasRef.nativeElement, this.scene);
}
}
