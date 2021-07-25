import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCampComponent } from './cadastro-camp.component';

describe('CadastroCampComponent', () => {
  let component: CadastroCampComponent;
  let fixture: ComponentFixture<CadastroCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroCampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
