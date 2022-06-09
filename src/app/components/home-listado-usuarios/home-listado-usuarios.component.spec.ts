import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListadoUsuariosComponent } from './home-listado-usuarios.component';

describe('HomeListadoUsuariosComponent', () => {
  let component: HomeListadoUsuariosComponent;
  let fixture: ComponentFixture<HomeListadoUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeListadoUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListadoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
