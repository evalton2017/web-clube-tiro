import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimentoComponent } from './requerimento.component';

describe('RequerimentoComponent', () => {
  let component: RequerimentoComponent;
  let fixture: ComponentFixture<RequerimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
