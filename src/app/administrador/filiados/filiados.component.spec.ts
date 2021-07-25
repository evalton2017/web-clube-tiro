import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliadosComponent } from './filiados.component';

describe('FiliadosComponent', () => {
  let component: FiliadosComponent;
  let fixture: ComponentFixture<FiliadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiliadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
