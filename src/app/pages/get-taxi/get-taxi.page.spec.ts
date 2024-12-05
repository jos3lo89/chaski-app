import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetTaxiPage } from './get-taxi.page';

describe('GetTaxiPage', () => {
  let component: GetTaxiPage;
  let fixture: ComponentFixture<GetTaxiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTaxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
