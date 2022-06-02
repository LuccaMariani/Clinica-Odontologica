import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosInformacionComponent } from './usuarios-informacion.component';

describe('UsuariosInformacionComponent', () => {
  let component: UsuariosInformacionComponent;
  let fixture: ComponentFixture<UsuariosInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
