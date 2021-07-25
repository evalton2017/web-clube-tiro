import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliadoComponent } from './filiado.component';

describe('FiliadoComponent', () => {
  let component: FiliadoComponent;
  let fixture: ComponentFixture<FiliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiliadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
