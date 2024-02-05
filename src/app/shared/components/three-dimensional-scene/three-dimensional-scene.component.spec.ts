import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDimensionalSceneComponent } from './three-dimensional-scene.component';

describe('ThreeDimensionalSceneComponent', () => {
  let component: ThreeDimensionalSceneComponent;
  let fixture: ComponentFixture<ThreeDimensionalSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDimensionalSceneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreeDimensionalSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
