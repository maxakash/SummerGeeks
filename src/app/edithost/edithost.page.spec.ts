import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdithostPage } from './edithost.page';

describe('EdithostPage', () => {
  let component: EdithostPage;
  let fixture: ComponentFixture<EdithostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdithostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdithostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
