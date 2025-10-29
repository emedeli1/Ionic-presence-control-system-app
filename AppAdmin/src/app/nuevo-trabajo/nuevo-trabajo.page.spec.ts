import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoTrabajoPage } from './nuevo-trabajo.page';

describe('NuevoTrabajoPage', () => {
  let component: NuevoTrabajoPage;
  let fixture: ComponentFixture<NuevoTrabajoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
