import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteDropboxComponent } from './autocomplete-dropbox.component';

describe('AutocompleteDropboxComponent', () => {
  let component: AutocompleteDropboxComponent;
  let fixture: ComponentFixture<AutocompleteDropboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteDropboxComponent]
    });
    fixture = TestBed.createComponent(AutocompleteDropboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should failed', () => {
    fail('This test will fail, because it is just a preview of functionality');
  });
});
