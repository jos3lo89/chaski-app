import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetMototaxiPage } from './get-mototaxi.page';

describe('GetMototaxiPage', () => {
  let component: GetMototaxiPage;
  let fixture: ComponentFixture<GetMototaxiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMototaxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
