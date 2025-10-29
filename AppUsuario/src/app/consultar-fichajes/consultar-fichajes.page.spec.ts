import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarFichajesPage } from './consultar-fichajes.page';

describe('ConsultarFichajesPage', () => {
  let component: ConsultarFichajesPage;
  let fixture: ComponentFixture<ConsultarFichajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarFichajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
