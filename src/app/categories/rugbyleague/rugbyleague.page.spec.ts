import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RugbyleaguePage } from './rugbyleague.page';

describe('RugbyleaguePage', () => {
  let component: RugbyleaguePage;
  let fixture: ComponentFixture<RugbyleaguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RugbyleaguePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RugbyleaguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
