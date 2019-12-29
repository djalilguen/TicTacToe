import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTicComponent } from './grid-tic.component';

describe('GridTicComponent', () => {
  let component: GridTicComponent;
  let fixture: ComponentFixture<GridTicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridTicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
