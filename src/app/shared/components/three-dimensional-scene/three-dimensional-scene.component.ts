import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { BabylonServiceService } from '../../services/babylon-service.service';
import * as Babylon from '@babylonjs/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { style } from '@angular/animations';
import '@Babylonjs/loaders';

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
  private loadedMeshes: Babylon.AbstractMesh[] = [];
  // private originalMaterials: Map<Babylon.AbstractMesh, Babylon.Material> = new Map();


  @ViewChild('rCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private createScene(engine: Babylon.Engine): void {
    this.scene = new Babylon.Scene(engine);
    const camera = new Babylon.ArcRotateCamera("camera", 2.372, 1, 10, Babylon.Vector3.Zero(), this.scene);
    camera.upperRadiusLimit = 10; // Adjust this as needed
    camera.lowerRadiusLimit = 0.25; // Adjust this as needed
    camera.minZ = 0.01;
    camera.attachControl(this.canvasRef.nativeElement, true); // Use nativeElement
    
    const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(0, 1, 0), this.scene);
    
    Babylon.SceneLoader.Append("assets/3D objects/", "bowling_pin_gameready.glb", this.scene, (scene) => {
      this.loadedMeshes = scene.meshes;
      // Assuming the model has been loaded and you want to scale all its meshes
      this.loadedMeshes.forEach(mesh => {
        mesh.scaling.scaleInPlace(1); // Adjust the scale factor as needed
      });
      
      // Optionally, set the camera target to the first mesh if you don't have a specific target
      if(scene.meshes.length > 0) {
        camera.setTarget(scene.meshes[0].position);
      }
    });
  
  

    // const box = Babylon.MeshBuilder.CreateBox("box", { size: 2 }, this.scene);
    // const ground = Babylon.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, this.scene);
    // gsap.registerPlugin(ScrollTrigger);
    // this.canvasRef.nativeElement.style.height = '100vh'; // Or any other appropriate height
//     const tl = gsap.timeline({
//       scrollTrigger:{
//         trigger:'body',
//         start: 'top top',
//         end: '50% 50%',
//         scrub: 1,
//       }
//     });

//     tl.to(box.rotation, { y: Math.PI * 2, duration: 100 }, 0);


//     const tl2 = gsap.timeline({
//       scrollTrigger:{
//         trigger:'body',
//         start: '50% 50%',
//         end: 'bottom bottom',
//         scrub: 1,
//       }
//     });
// // Wrapper height animation
// const wrapper = document.getElementById('wrapper');
// tl2.to('.wrapper', { width: 0, duration: 2 }, 1);

  }

  ChangeTexture(Texture:string){
    this.loadedMeshes.forEach(mesh=>{
              // Check if the mesh has a material, and it's either a StandardMaterial or PBRMaterial
              if (mesh.material) {
                if (mesh.material instanceof Babylon.StandardMaterial) {
                  // Applying a new dsiffuse texture to StandardMaterial
                  mesh.material.diffuseTexture = new Babylon.Texture(Texture, this.scene);
                } 
                else if (mesh.material instanceof Babylon.PBRMaterial) {
                  // Applying a new albedo texture to PBRMaterial
                  mesh.material.albedoTexture = new Babylon.Texture(Texture, this.scene);
                }
                // Extend with more 'else if' blocks if you have other material types
              } 
              else {
                // If there's no material, create a StandardMaterial and apply the texture
                const material = new Babylon.StandardMaterial("materialFor-" + mesh.name, this.scene);
                material.diffuseTexture = new Babylon.Texture(Texture, this.scene);
                mesh.material = material;
              }
    })

  }

ngAfterViewInit(): void {
  const engine = this.engineService.createEngine(this.canvasRef.nativeElement);
  this.createScene(engine); // Now call createScene here
  this.engineService.start(this.canvasRef.nativeElement, this.scene);

}
}
