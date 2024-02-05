import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import * as Babylon from '@babylonjs/core';

@Injectable({
  providedIn: 'root'
})
export class BabylonServiceService {
  engine!:Babylon.Engine;
  constructor(public ngZone:NgZone) { }
  // the Engine will render into the Canvas element
  public createEngine(canvas: HTMLCanvasElement): Babylon.Engine {
    this.engine = new Babylon.Engine(canvas, true);
    return this.engine;
  }
  start(canvas: HTMLCanvasElement, scene: Babylon.Scene) {
  this.ngZone.runOutsideAngular( () => {
    this.engine.runRenderLoop(() => scene.render())
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  });
}
}
