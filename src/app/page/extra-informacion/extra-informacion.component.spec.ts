import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraInformacionComponent } from './extra-informacion.component';

describe('ExtraInformacionComponent', () => {
  let component: ExtraInformacionComponent;
  let fixture: ComponentFixture<ExtraInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
