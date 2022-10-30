import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositMapComponent } from './deposit-map.component';

describe('DepositMapComponent', () => {
  let component: DepositMapComponent;
  let fixture: ComponentFixture<DepositMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
